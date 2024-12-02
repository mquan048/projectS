import { query } from "../config/db.js";

export const countOrderInMonth = async (year) => {
    try {
        if (!year) {
            const now = new Date();
            year = now.getFullYear();
        }
    
        const result = await query(
            `SELECT
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 1 THEN 1 END) AS Jan,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 2 THEN 1 END) AS Feb,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 3 THEN 1 END) AS Mar,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 4 THEN 1 END) AS Apr,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 5 THEN 1 END) AS May,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 6 THEN 1 END) AS Jun,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 7 THEN 1 END) AS Jul,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 8 THEN 1 END) AS Aug,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 9 THEN 1 END) AS Sep,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 10 THEN 1 END) AS Oct,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 11 THEN 1 END) AS Nov,
                COUNT(CASE WHEN EXTRACT(MONTH FROM start_time) = 12 THEN 1 END) AS Dec
            FROM print_orders
            WHERE EXTRACT(YEAR FROM start_time) = $1`,
            [year]
        )
        return result.rows;
    } catch (error) {
        throw error;
    }
}