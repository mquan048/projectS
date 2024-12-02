// src/services/spaces.service.js
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { PDFDocument } from 'pdf-lib';
import { query } from "../config/db.js";
import fs from "fs";
import { config } from "dotenv";
import sharp from 'sharp';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

config();

// Constants
const SPACES_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    FILE_RETENTION_DAYS: 30,
    COMPRESSION_THRESHOLD: 1 * 1024 * 1024, // 1MB
    SIGNED_URL_EXPIRES: 3600 // 1 hour
};

// S3 Client Configuration
const s3Client = new S3Client({
    endpoint: `https://${process.env.SPACES_ENDPOINT}`,
    region: process.env.SPACE_REGION,
    credentials: {
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET
    }
});

// Load file types configuration
const file_type = JSON.parse(fs.readFileSync('./src/config/file_type.json', 'utf-8'));

/**
 * Generate a unique filename
 * @param {string} originalName - Original filename
 * @returns {string} Unique filename
 */
const generateUniqueFileName = (originalName) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
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
        // Add more compression logic for other file types if needed
        return fileBuffer;
    } catch (error) {
        console.error('Compression error:', error);
        return fileBuffer;
    }
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
        // Validate file size
        if (file.size > SPACES_CONFIG.MAX_FILE_SIZE) {
            throw new Error('File size exceeds limit');
        }

        // Validate file type
        if (!SPACES_CONFIG.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            throw new Error('File type not allowed');
        }

        // Generate unique filename
        const uniqueFileName = generateUniqueFileName(file.originalname);

        // Read and compress file
        let fileBuffer = fs.readFileSync(file.path);
        fileBuffer = await compressFileIfNeeded(fileBuffer, file.mimetype);

        // Upload to Spaces
        const uploadParams = {
            Bucket: process.env.SPACE_NAME,
            Key: uniqueFileName,
            Body: fileBuffer,
            ContentType: file.mimetype,
            ACL: 'private', // Make file private by default
            Metadata: {
                'original-name': file.originalname,
                'upload-date': new Date().toISOString(),
                'user-id': user_id.toString(),
                'file-size': file.size.toString()
            }
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        // Count pages for PDF
        let numPages = 1;
        if (file_type[file.mimetype] === 'pdf') {
            const pdfDoc = await PDFDocument.load(fileBuffer);
            numPages = pdfDoc.getPageCount();
        }

        // Generate signed URL for temporary access
        const getObjectParams = {
            Bucket: process.env.SPACE_NAME,
            Key: uniqueFileName
        };
        const signedUrl = await getSignedUrl(
            s3Client,
            new GetObjectCommand(getObjectParams),
            { expiresIn: SPACES_CONFIG.SIGNED_URL_EXPIRES }
        );

        // Save to database
        const result = await query(
            `INSERT INTO documents
            (document_id, name, file_type, number_of_pages, user_id, file_size, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                uniqueFileName,
                file.originalname,
                file_type[file.mimetype],
                numPages,
                user_id,
                file.size,
                'active'
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
        // Clean up temporary file
        if (file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
};

/**
 * Delete file from Spaces
 * @param {string} document_id - Document ID
 * @param {string} user_id - User ID
 * @returns {Promise<boolean>} Delete result
 */
export const deleteFile = async (document_id, user_id) => {
    try {
        // Check if user owns the file
        const fileCheck = await query(
            "SELECT * FROM documents WHERE document_id = $1 AND user_id = $2",
            [document_id, user_id]
        );

        if (fileCheck.rowCount === 0) {
            throw new Error('File not found or unauthorized');
        }

        // Delete from Spaces
        const deleteParams = {
            Bucket: process.env.SPACE_NAME,
            Key: document_id
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));

        // Update database
        await query(
            "UPDATE documents SET status = 'deleted', deleted_at = NOW() WHERE document_id = $1",
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
        // Check if user has access to file
        const fileCheck = await query(
            "SELECT * FROM documents WHERE document_id = $1 AND user_id = $2",
            [document_id, user_id]
        );

        if (fileCheck.rowCount === 0) {
            throw new Error('File not found or unauthorized');
        }

        const params = {
            Bucket: process.env.SPACE_NAME,
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
            WHERE user_id = $1 AND status = 'active'
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`,
            [user_id, options.limit, offset]
        );

        const countResult = await query(
            "SELECT COUNT(*) FROM documents WHERE user_id = $1 AND status = 'active'",
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
            WHERE created_at < $1
            AND status = 'active'`,
            [retentionDate]
        );

        for (const file of oldFiles.rows) {
            try {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: process.env.SPACE_NAME,
                    Key: file.document_id
                }));

                await query(
                    `UPDATE documents
                    SET status = 'archived',
                        archived_at = NOW()
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
