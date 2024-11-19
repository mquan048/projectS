import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as printerController  from '../controllers/printer.controller.js';

const route = Router()

route.post('/add', authMiddleware.spsoPermission, printerController.addPrinter)
route.get('/get-all', printerController.getAllPrinters)
route.get('/get/:id', printerController.getPrinter)
route.put('/change-state/:id', authMiddleware.spsoPermission, printerController.changeState)
route.put('/update/:id', authMiddleware.spsoPermission, printerController.updateInfo)

export default route;