import { Router } from "express";
import * as pageOrderController from "../controllers/pageOrder.controller.js"
const route = Router();


route.get('/my', pageOrderController.getPageOrderByUserid);
route.put('/:id', pageOrderController.changeState);
route.get('/:id', pageOrderController.getPageOrderById);
route.post('/', pageOrderController.addPageOrder);
route.get('/', pageOrderController.getAllPageOrders);
export default route;