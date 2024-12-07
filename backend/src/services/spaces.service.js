import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { PDFDocument } from 'pdf-lib';
import { query } from "../config/db.js";
import fs from "fs";
import { config } from "dotenv";
import sharp from 'sharp';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

config();

const SPACES_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  FILE_RETENTION_DAYS: 30,
  COMPRESSION_THRESHOLD: 1 * 1024 * 1024,
  SIGNED_URL_EXPIRES: 3600
};

// S3 Client Configuration
const s3Client = new S3Client({
  endpoint: `https://${process.env.SPACES_ENDPOINT}`,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  }
});

const file_type = JSON.parse(fs.readFileSync('./src/config/file_type.json', 'utf-8'));

/**
 * Generate a unique filename
 * @param {string} originalName - Original filename
 * @returns {string} Unique filename
 */
const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomString}`;
};

/**
 * Compress file if needed
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} mimeType - File mime type
 * @returns {Promise<Buffer>} Compressed file buffer
 */
const compressFileIfNeeded = async (fileBuffer, mimeType) => {
  if (fileBuffer.length <= SPACES_CONFIG.COMPRESSION_THRESHOLD) {
    return fileBuffer;
  }

  try {
    if (mimeType === 'application/pdf') {
      const pdfDoc = await PDFDocument.load(fileBuffer);
      return await pdfDoc.save({
        useObjectStreams: true,
        compress: true
      });
    }
    return fileBuffer;
  } catch (error) {
    console.error('Compression error:', error);
    return fileBuffer;
  }
};

//  Sanitize filename for metadata
const sanitizeMetadataValue = (filename) => {

    return filename
        .replace(/[^a-zA-Z0-9.-]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

/**
 * Upload file to Digital Ocean Spaces
 * @param {Object} file - File object from multer
 * @param {string} user_id - User ID
 * @returns {Promise<Object>} Upload result
 */
export const uploadFile = async (file, user_id) => {
  let tempFilePath = null;

  try {
    if (file.size > SPACES_CONFIG.MAX_FILE_SIZE) {
      throw new Error('File size exceeds limit');
    }

    if (!SPACES_CONFIG.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      throw new Error('File type not allowed');
    }

    const uniqueFileName = generateUniqueFileName(file.originalname);

    let fileBuffer = fs.readFileSync(file.path);
    fileBuffer = await compressFileIfNeeded(fileBuffer, file.mimetype);

    const uploadParams = {
      Bucket: process.env.SPACES_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: file.mimetype,
      ACL: 'private',
      Metadata: {
        'original-name': sanitizeMetadataValue(file.originalname),
        'upload-date': new Date().toISOString(),
        'user-id': user_id.toString(),
        'file-size': file.size.toString()
      }
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    let numPages = 1;
    if (file_type[file.mimetype] === 'pdf') {
      const pdfDoc = await PDFDocument.load(fileBuffer);
      numPages = pdfDoc.getPageCount();
    }

    const getObjectParams = {
      Bucket: process.env.SPACES_NAME,
      Key: uniqueFileName
    };
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand(getObjectParams),
      { expiresIn: SPACES_CONFIG.SIGNED_URL_EXPIRES }
    );

    const result = await query(
      `INSERT INTO documents
          (document_id, name, file_type, number_of_pages, user_id, file_size)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
      [
        uniqueFileName,
        file.originalname,
        file_type[file.mimetype],
        numPages,
        user_id,
        file.size
      ]
    );

    return {
      success: true,
      document: result.rows[0],
      signedUrl,
      expiresIn: SPACES_CONFIG.SIGNED_URL_EXPIRES
    };

  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  } finally {
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
};

/**
 * Delete file from Spaces
 * @param {string} document_id - Document ID
 * @returns {Promise<boolean>} Delete result
 */
export const deleteFile = async (document_id) => {
  try {
    const fileCheck = await query(
      "SELECT * FROM documents WHERE document_id = $1",
      [document_id]
    );

    if (fileCheck.rowCount === 0) {
      throw new Error('File not found');
    }

    const deleteParams = {
      Bucket: process.env.SPACES_NAME,
      Key: document_id
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    await query(
      "DELETE FROM documents WHERE document_id = $1",
      [document_id]
    );

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};


/**
 * Get signed URL for file download
 * @param {string} document_id - Document ID
 * @param {string} user_id - User ID
 * @returns {Promise<string>} Signed URL
 */
export const getFileUrl = async (document_id, user_id) => {
  try {
    const fileCheck = await query(
      "SELECT * FROM documents WHERE document_id = $1 AND user_id = $2",
      [document_id, user_id]
    );

    if (fileCheck.rowCount === 0) {
      throw new Error('File not found or unauthorized');
    }

    const params = {
      Bucket: process.env.SPACES_NAME,
      Key: document_id
    };

    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand(params),
      { expiresIn: SPACES_CONFIG.SIGNED_URL_EXPIRES }
    );

    return signedUrl;
  } catch (error) {
    console.error('Get URL error:', error);
    throw error;
  }
};

/**
 * List user's files
 * @param {string} user_id - User ID
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} List of files
 */
export const listUserFiles = async (user_id, options = { page: 1, limit: 10 }) => {
  try {
    const offset = (options.page - 1) * options.limit;

    const result = await query(
      `SELECT * FROM documents
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`,
      [user_id, options.limit, offset]
    );


    const countResult = await query(
      "SELECT COUNT(*) FROM documents WHERE user_id = $1",
      [user_id]
    );

    const totalFiles = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalFiles / options.limit);

    return {
      files: result.rows,
      pagination: {
        currentPage: options.page,
        totalPages,
        totalFiles,
        hasMore: options.page < totalPages
      }
    };
  } catch (error) {
    console.error('List files error:', error);
    throw error;
  }
};

/**
 * Clean up old files
 * @returns {Promise<void>}
 */
export const cleanupOldFiles = async () => {
  try {
    const retentionDate = new Date();
    retentionDate.setDate(retentionDate.getDate() - SPACES_CONFIG.FILE_RETENTION_DAYS);

    const oldFiles = await query(
      `SELECT document_id FROM documents
      WHERE created_at < $1`,
      [retentionDate]
    );

    for (const file of oldFiles.rows) {
      try {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.SPACES_NAME,
          Key: file.document_id
        }));

        await query(
          `DELETE FROM documents
           WHERE document_id = $1`,
          [file.document_id]
        );
      } catch (error) {
        console.error(`Error cleaning up file ${file.document_id}:`, error);
      }
    }

    console.log(`Cleaned up ${oldFiles.rows.length} old files`);
  } catch (error) {
    console.error('Cleanup error:', error);
    throw error;
  }
};

export default {
  uploadFile,
  deleteFile,
  getFileUrl,
  listUserFiles,
  cleanupOldFiles
};
