import express from 'express';
import route from './src/routes/index.js';

const app = express();

import route from './src/routes/index.route.js';
import { testConnection } from './src/config/db.js';
const startServer = async () => {
    try {
        await testConnection();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api', route)
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};


startServer();
