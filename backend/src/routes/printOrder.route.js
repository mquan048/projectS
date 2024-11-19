import { Router } from "express";
import * as printOrderController from "../controllers/printOrder.controller.js";
const route = Router();


route.get('/filter', printOrderController.filter);
route.get('/my', printOrderController.getPrintOrderByUserid)
route.put('/:id', printOrderController.changeState);
route.delete('/:id', printOrderController.deletePrintOrder);
route.get('/:id', printOrderController.getPrintOrderById);
route.post('/', printOrderController.addPrintOrder);
route.get('/', printOrderController.getAllPrintOrders);
export default route;