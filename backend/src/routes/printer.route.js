import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as printerController  from '../controllers/printer.controller.js';

const route = Router()

route.get('/', printerController.getAllPrinters)
route.get('/:id', printerController.getPrinter)
route.post('/', authMiddleware.spsoPermission, printerController.addPrinter)
route.put('/change-state/:id', authMiddleware.spsoPermission, printerController.changeState)
route.put('/update/:id', authMiddleware.spsoPermission, printerController.updateInfo)
route.delete('/:id', authMiddleware.spsoPermission, printerController.deletePrinter)

export default route;