// src/utils/fileValidation.js
const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateFileType = (file) => {
    if (!file) return false;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return false;
    }

    // Check mime type
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return false;
    }

    return true;
};
