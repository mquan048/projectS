// src/services/monitoring.service.js
import { CloudWatch } from '@aws-sdk/client-cloudwatch';

const cloudwatch = new CloudWatch({
    region: process.env.SPACE_REGION,
    credentials: {
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET
    }
});

export const logSpaceMetrics = async (operation, fileSize) => {
    try {
        await cloudwatch.putMetricData({
            Namespace: 'HCMUT_SSPS',
            MetricData: [
                {
                    MetricName: 'StorageUsed',
                    Value: fileSize,
                    Unit: 'Bytes',
                    Dimensions: [
                        {
                            Name: 'Operation',
                            Value: operation
                        }
                    ]
                }
            ]
        });
    } catch (error) {
        console.error('Monitoring error:', error);
    }
};

// Sử dụng trong upload service
export const uploadFile = async (file, user_id) => {
    try {
        // ... code upload ...

        // Log metrics
        await logSpaceMetrics('Upload', file.size);

    } catch (error) {
        throw error;
    }
};
