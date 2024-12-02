import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

export const SPACES_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  FILE_RETENTION_DAYS: 30,
  COMPRESSION_THRESHOLD: 1 * 1024 * 1024
};

export const s3Client = new S3Client({
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  },
  forcePathStyle: false
});

export const spacesConfig = {
  bucketName: process.env.SPACES_NAME,
  region: process.env.SPACES_REGION,
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`
};
