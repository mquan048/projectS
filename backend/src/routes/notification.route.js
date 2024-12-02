import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as notificationController  from '../controllers/notification.controller.js';

const route = Router()

route.get('/', authMiddleware.userPermission, notificationController.getNotify)
route.put('/:id', authMiddleware.userPermission, notificationController.viewNotify)
route.put('/', authMiddleware.userPermission, notificationController.viewAll)
route.delete('/:id', authMiddleware.userPermission, notificationController.deleteNotify)
route.delete('/', authMiddleware.userPermission, notificationController.deleteAll)

export default route;