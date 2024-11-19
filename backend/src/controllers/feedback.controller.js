
import * as feedbackService from "../services/feedback.service.js";

export const addFeedback = async (req, res) => {
    try {
        const dataForm = req.body;
        await feedbackService.addFeedback(dataForm);
        return res.status(201).json();
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await feedbackService.getAllFeedback(req.params.id);
        return res.status(200).json(feedback);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};


export const deleteFeedback = async (req, res) => {
    try {
        await feedbackService.deleteFeedback(req.params.id);
        return res.status(200).json({ message: 'delete completed' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}
