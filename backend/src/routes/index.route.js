import { Router } from "express";
import documentRoute from "./document.route.js";
import feedbackRoute from "./feedback.route.js";
import pageOrderRoute from "./pageOrder.route.js";
import printOrderRouter from "./printOrder.route.js";

const route = Router();


route.use('/documents', documentRoute);
route.use('/feedbacks', feedbackRoute);
route.use('/page-orders', pageOrderRoute);
route.use('/print-orders', printOrderRouter);


export default route;