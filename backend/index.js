import express from 'express';
import route from './src/routes/index.js';
// import route from './src/routes/index.route.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { testConnection } from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, './src/config/swagger.yml'));

const app = express();
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Documentation"
};


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
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
