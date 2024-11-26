import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as userController  from '../controllers/user.controller.js';

const route = Router()

route.get('/', authMiddleware.userPermission, userController.getUserInfo)

export default route