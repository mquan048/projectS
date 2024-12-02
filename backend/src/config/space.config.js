// src/config/spaces.config.js
export const SPACES_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    FILE_RETENTION_DAYS: 30, // Số ngày giữ file
    COMPRESSION_THRESHOLD: 1 * 1024 * 1024 // Nén file > 1MB
};
