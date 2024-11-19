
import { query } from "../config/db.js";

export const addFeedback = async ({ user_id, title, content, rating }) => {
    try {
        const result = await query(
            "INSERT INTO feedbacks (user_id, title, content, rating) VALUES ($1, $2, $3, $4)",
            [user_id, title, content, rating]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllFeedback = async () => {
    try {
        const result = await query("SELECT * FROM feedbacks");
        return result.rows;
    } catch (error) {
        throw error
    }
}

export const getFeedbackById = async (feedback_id) => {
    try {
        const result = await query("SELECT * FROM feedbacks WHERE feedback_id = $1", [feedback_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const deleteFeedback = async (feedback_id) => {
    try {
        const result = await query("DELETE FROM feedbacks WHERE feedback_id = $1", [feedback_id]);
        return result;
    } catch (error) {
        throw error;
    }
}