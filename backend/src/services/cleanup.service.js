// src/services/cleanup.service.js
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { query } from "../config/db.js";
import { SPACES_CONFIG } from '../config/spaces.config.js';

export const cleanupOldFiles = async () => {
    try {
        const retentionDate = new Date();
        retentionDate.setDate(retentionDate.getDate() - SPACES_CONFIG.FILE_RETENTION_DAYS);

        // Lấy danh sách file cần xóa từ DB
        const oldFiles = await query(
            `SELECT document_id FROM documents
             WHERE created_at < $1
             AND status = 'completed'`,
            [retentionDate]
        );

        for (const file of oldFiles.rows) {
            // Xóa từ Spaces
            const deleteParams = {
                Bucket: process.env.SPACE_NAME,
                Key: file.document_id
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));

            // Cập nhật trạng thái trong DB
            await query(
                `UPDATE documents
                 SET status = 'archived',
                     archived_at = NOW()
                 WHERE document_id = $1`,
                [file.document_id]
            );
        }

        console.log(`Cleaned up ${oldFiles.rows.length} old files`);
    } catch (error) {
        console.error('Cleanup error:', error);
    }
};

// Thiết lập job chạy hàng ngày
import cron from 'node-cron';

// Chạy lúc 00:00 mỗi ngày
cron.schedule('0 0 * * *', () => {
    cleanupOldFiles();
});
