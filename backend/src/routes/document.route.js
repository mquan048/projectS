import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import multerUpload from '../middlewares/multer.middleware.js';
import * as documentController from "../controllers/document.controller.js";

const route = Router();

route.delete('/:id', authMiddleware.userPermission, documentController.deleteDocument);
route.get('/:id', documentController.getDocumentById);
route.post('/', authMiddleware.userPermission, multerUpload.single('file'), documentController.addDocument);
route.get('/', authMiddleware.userPermission, documentController.getDocumentByUserId);
export default route;