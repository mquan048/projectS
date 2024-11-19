import { Router } from 'express';
import authRoute from './auth.route.js'
import printerRoute from './printer.route.js'
import notificationRoute from './notification.route.js'
import uploadRoute from './upload.route.js'

const route = Router();

route.use('/auth', authRoute);
route.use('/printer', printerRoute);
route.use('/notification', notificationRoute);
route.use('/file', uploadRoute);

export default route;
