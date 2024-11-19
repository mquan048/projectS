import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as notificationController  from '../controllers/notification.controller.js';

const route = Router()

route.get('/get/', authMiddleware.userPermission, notificationController.getNotify)
route.put('/view/:id', authMiddleware.userPermission, notificationController.viewNotify)
route.put('/view-all', authMiddleware.userPermission, notificationController.viewAll)
route.delete('/delete/:id', authMiddleware.userPermission, notificationController.deleteNotify)
route.delete('/delete-all', authMiddleware.userPermission, notificationController.deleteAll)

export default route;