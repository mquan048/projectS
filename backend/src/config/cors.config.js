// src/config/cors.config.js
export const corsOptions = {
    AllowedOrigins: [
        'http://localhost:5000',
    ],
    AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    AllowedHeaders: ['*'],
    ExposeHeaders: ['ETag'],
    MaxAgeSeconds: 3000
};

// Áp dụng CORS trong Digital Ocean Console hoặc qua API:
import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';

const configureCORS = async () => {
    try {
        const command = new PutBucketCorsCommand({
            Bucket: process.env.SPACE_NAME,
            CORSConfiguration: {
                CORSRules: [
                    {
                        AllowedHeaders: corsOptions.AllowedHeaders,
                        AllowedMethods: corsOptions.AllowedMethods,
                        AllowedOrigins: corsOptions.AllowedOrigins,
                        ExposeHeaders: corsOptions.ExposeHeaders,
                        MaxAgeSeconds: corsOptions.MaxAgeSeconds
                    }
                ]
            }
        });

        await s3Client.send(command);
        console.log('CORS configuration updated successfully');
    } catch (error) {
        console.error('Error updating CORS configuration:', error);
    }
};
