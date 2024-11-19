import { query } from "../config/db.js"

export const addPrinter = async ({name, brand, model, campus, room, building}) => {
    try {
        const result = await query(
            'INSERT INTO printers (name, brand, model, campus, room, building) VALUES ($1, $2, $3, $4, $5, $6)', 
            [ name, brand, model, campus, room, building ],
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const changeState = async (id, state) => {
    try {
        const result = await query(
            'UPDATE printers SET state = $1 WHERE id = $2', 
            [id, state]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllPrinters = async () => {
    try {
        const printers = await query('SELECT * FROM printers')
        return printers.rows;
    } catch (error) {
        throw error;
    }
}

export const getPrinter = async (id) => {
    try {
        const printers = await query('SELECT * FROM printers WHERE printer_id = $1',[id])
        return printers.rows;
    } catch (error) {
        throw error;
    }
}

export const updateInfo = async (id, {name, brand, model, campus, room, building}) => {
    try {
        const result = await query(
            'UPDATE printers SET name = $1, brand = $2, model = $3, campus = $4, room = $5, building = $6 WHERE printer_id = $7',
            [name, brand, model, campus, room, building, id]
        );
        return result;
    } catch (error) {
        throw error
    }
}