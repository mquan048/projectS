import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as reportController from '../controllers/report.controller.js';
const route = Router();

route.get('/month', authMiddleware.spsoPermission, reportController.countOrderInMonth)

export default route