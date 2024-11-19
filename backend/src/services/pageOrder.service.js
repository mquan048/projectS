import { query } from "../config/db.js";


export const addPageOrder = async ({ user_id, number_of_a4_pages, o_state, price }) => {
    try {
        const result = await query(
            "INSERT INTO page_orders (user_id, number_of_a4_pages, o_state, price) VALUES ($1, $2, $3, $4)",
            [user_id, number_of_a4_pages, o_state, price]
        )
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllPageOrders = async () => {
    try {
        const result = await query("SELECT * FROM page_orders");
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const getPageOrderById = async (transaction_id) => {
    try {
        const result = await query("SELECT * FROM page_orders WHERE transaction_id = $1", [transaction_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const getPageOrderByUserid = async (user_id) => {
    try {
        const result = await query("SELECT * FROM page_orders WHERE user_id = $1", [user_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const changeState = async ({ id, o_state }) => {
    try {
        const result = await query("UPDATE page_orders SET o_state = $1 WHERE transaction_id = $2", [o_state, id]);
        return result;
    } catch (error) {
        throw error;
    }
}


