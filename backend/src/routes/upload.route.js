
import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import { upload, remove } from '../controllers/upload.controller.js';
import multer from '../middlewares/multer.middleware.js';

const route = Router();

route.post('/',
  authMiddleware.userPermission,
  multer.single('file'),
  upload
);

route.delete('/:document_id',
  authMiddleware.userPermission,
  remove
);

export default route;
