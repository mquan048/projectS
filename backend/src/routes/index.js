import { Router } from 'express';
import authRoute from './auth.route.js'
import printerRoute from './printer.route.js'
import notificationRoute from './notification.route.js'
import uploadRoute from './upload.route.js'
import documentRoute from "./document.route.js";
import feedbackRoute from "./feedback.route.js";
import pageOrderRoute from "./pageOrder.route.js";
import printOrderRouter from "./printOrder.route.js";
import userRoute from './user.route.js'
import spsoRoute from './spso.route.js'
import reportRoute from './report.route.js';

const route = Router();

route.use('/auth', authRoute);
route.use('/printer', printerRoute);
route.use('/notification', notificationRoute);
route.use('/file', uploadRoute);
route.use('/document', documentRoute);
route.use('/feedback', feedbackRoute);
route.use('/page-order', pageOrderRoute);
route.use('/print-order', printOrderRouter);
route.use('/user', userRoute);
route.use('/spso', spsoRoute);
route.use('/report', reportRoute)

export default route;
