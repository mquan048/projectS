import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as printOrderController from "../controllers/printOrder.controller.js";
const route = Router();


route.get('/', authMiddleware.userPermission, printOrderController.getPrintOrdersByUserid)
route.get('/get-all', printOrderController.getAllPrintOrders);
route.get('/filter', printOrderController.filter);
route.get('/:id', printOrderController.getPrintOrderById);
route.put('/:id', printOrderController.changeState);
route.post('/', authMiddleware.userPermission, printOrderController.addPrintOrder);
route.delete('/:id', printOrderController.deletePrintOrder);
export default route;