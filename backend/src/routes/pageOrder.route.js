import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as pageOrderController from "../controllers/pageOrder.controller.js"
const route = Router();

route.get('/get', authMiddleware.userPermission, pageOrderController.getPageOrderByUserid);
route.get('/get-all', authMiddleware.spsoPermission, pageOrderController.getAllPageOrders);
route.get('/:id', pageOrderController.getPageOrderById);
route.post('/', authMiddleware.userPermission, pageOrderController.addPageOrder);
route.put('/:id', pageOrderController.changeState);
export default route;