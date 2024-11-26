import { Router } from "express";
import documentRoute from "./document.route.js";
import feedbackRoute from "./feedback.route.js";
import pageOrderRoute from "./pageOrder.route.js";
import printOrderRouter from "./printOrder.route.js";
import authRoute from './auth.route.js'
import printerRoute from './printer.route.js'
import notificationRoute from './notification.route.js'
import userRoute from './user.route.js'
import spsoRoute from './notification.route.js'

const route = Router();

route.use('/auth', authRoute);
route.use('/printer', printerRoute);
route.use('/notification', notificationRoute);
route.use('/documents', documentRoute);
route.use('/feedbacks', feedbackRoute);
route.use('/page-orders', pageOrderRoute);
route.use('/print-orders', printOrderRouter);
route.use('/user', userRoute);
route.use('/spso', spsoRoute);


export default route;