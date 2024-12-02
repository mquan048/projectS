import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import {
  upload,
  remove,
  getFileUrl,
  getUserFiles,
  triggerCleanup
} from '../controllers/upload.controller.js';
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


route.get('/:document_id/url',
  authMiddleware.userPermission,
  getFileUrl
);


route.get('/list',
  authMiddleware.userPermission,
  getUserFiles
);


route.post('/cleanup',
  authMiddleware.spsoPermission,
  triggerCleanup
);

export default route;
