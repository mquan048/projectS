import express from 'express';

const app = express();

import { testConnection } from './src/config/db.js';
const startServer = async () => {
    try {
        await testConnection();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
