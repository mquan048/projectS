import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as spsoController  from '../controllers/spso.controller.js';

const route = Router()

route.get('/', authMiddleware.spsoPermission, spsoController.getSpsoInfo)
route.put('/allocate-pages', authMiddleware.spsoPermission, spsoController.allocatePages)

export default route