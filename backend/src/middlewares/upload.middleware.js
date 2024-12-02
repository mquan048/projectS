// src/middleware/upload.middleware.js
import multer from 'multer';
import { SPACES_CONFIG } from '../config/spaces.config.js';

const fileValidation = {
    // Kiểm tra mime type
    checkFileType: (file) => {
        return SPACES_CONFIG.ALLOWED_FILE_TYPES.includes(file.mimetype);
    },

    // Kiểm tra kích thước file
    checkFileSize: (file) => {
        return file.size <= SPACES_CONFIG.MAX_FILE_SIZE;
    },

    // Kiểm tra tên file
    sanitizeFileName: (fileName) => {
        return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/temp/');
    },
    filename: (req, file, cb) => {
        const sanitizedName = fileValidation.sanitizeFileName(file.originalname);
        cb(null, `${Date.now()}-${sanitizedName}`);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!fileValidation.checkFileType(file)) {
            return cb(new Error('File type not allowed'), false);
        }
        if (!fileValidation.checkFileSize(file)) {
            return cb(new Error('File size exceeds limit'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: SPACES_CONFIG.MAX_FILE_SIZE
    }
}).single('file');

// Middleware xử lý lỗi upload
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: true,
            message: `Upload error: ${err.message}`
        });
    }
    next(err);
};
