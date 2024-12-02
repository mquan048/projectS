import { query } from "../config/db.js";

export const addPrintOrder = async (user_id, document_id, { printer_id, sided, paper_size, paper_orientation, pages_per_sheet, number_of_copies, p_state, scale }) => {
    try {
        const result = await query(
            "INSERT INTO print_orders (user_id, document_id, printer_id, sided, paper_size, paper_orientation, pages_per_sheet, number_of_copies, p_state, scale) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [user_id, document_id, printer_id, sided, paper_size, paper_orientation, pages_per_sheet, number_of_copies, p_state, scale]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllPrintOrders = async (page = 1) => {
    try {
        const limit = 10;
        const offset = (Number(page) - 1) * limit;
        const result = await query("SELECT * FROM print_orders ORDER BY created_at DESC LIMIT 10 OFFSET $1", [offset]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const getPrintOrderById = async (id) => {
    try {
        const result = await query(
            `SELECT * 
            FROM print_orders 
            JOIN documents ON print_orders.document_id = documents.id
            WHERE print_orders.id = $1`, 
            [id]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const getPrintOrdersByUserid = async (id, page = 1, status) => {
    try {
        const limit = 10;
        const offset = (Number(page) - 1) * limit;
        const result = await query(
            `SELECT d.name, po.start_time, po.number_of_copies, p.campus, p.building, p.room, d.number_of_pages, po.state
            FROM print_orders po
            JOIN documents d ON po.document_id = d.id
            JOIN printer p ON po.printer_id = p.printer_id
            WHERE po.user_id = $1 ${status ? 'AND po.state = $2' : ''}
            ORDER BY created_at DESC 
            LIMIT 10 OFFSET $3`, 
            [id, status, offset]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const changeState = async ({ id, p_state }) => {
    try {
        if (p_state === 'completed') {
            const get_current_time = await query("SELECT CURRENT_TIMESTAMP as end_time");
            const end_time = get_current_time.rows[0].end_time;
            const result = await query("UPDATE print_orders SET end_time = $1, p_state = $2 WHERE id = $3", [end_time, p_state, id]);
            return result;
        } else {
            const result = await query("UPDATE print_orders SET p_state = $1 WHERE id = $2", [p_state, id]);
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export const deletePrintOrder = async (id) => {
    try {
        const result = await query("DELETE FROM print_orders WHERE id = $1", [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export const filter = async ({ full_name = '', begin_at = undefined, end_at = undefined , page = 1}) => {
    try {
        const limit = 10;
        const offset = (Number(page) - 1) * limit;
        const get_current_time = await query("SELECT CURRENT_TIMESTAMP as end_time");
        const end_time = get_current_time.rows[0].end_time;
        end_at = end_at === undefined ? end_time : new Date(end_at);
        begin_at = begin_at === undefined ? new Date(0) : new Date(begin_at);
        if (full_name) {
            const result = await query(
                `SELECT p.* FROM print_orders p 
                INNER JOIN users u ON p.user_id = u.id 
                WHERE u.full_name = $1 AND p.start_time >= $2 AND p.start_time <= $3 
                ORDER BY p.start_time
                LIMIT 10 OFFSET $4`,
                [full_name, begin_at, end_at, offset]
            )
            return result.rows;
        } else {
            const result = await query(
                `SELECT * FROM print_orders p
                WHERE p.start_time >= $1 AND p.start_time <= $2 
                ORDER BY p.start_time
                LIMIt 10 OFFSET $3`,
                [begin_at, end_at, offset]
            )
            return result.rows;
        }
    } catch (error) {
        throw error;
    }
}

export const calcPages = (pageOfDocument, {sided, paper_size, pages_per_sheet, number_of_copies}) => {
    let pageNeedToPrint = pageOfDocument;
    if(sided === 'two-sided')
        pageNeedToPrint /= 2;
    if(paper_size === 'A3')
        pageNeedToPrint *= 2;
    pageNeedToPrint /= pages_per_sheet;
    pageNeedToPrint *= number_of_copies;
    return pageNeedToPrint;
}