import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller.js"

const route = Router();


route.delete('/:id', feedbackController.deleteFeedback);
route.get('/:id', feedbackController.getFeedbackById);
route.post('/', feedbackController.addFeedback);
route.get('/', feedbackController.getAllFeedback);
export default route;