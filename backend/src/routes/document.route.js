import { Router } from "express";
import * as documentController from "../controllers/document.controller.js";

const route = Router();

route.delete('/:id', documentController.deleteDocument);
route.get('/:id', documentController.getDocumentById);
route.post('/', documentController.addDocument);
route.get('/', documentController.getDocuments);
export default route;