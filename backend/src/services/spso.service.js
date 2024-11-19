import { query } from '../config/db.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const createSpso = async ({username, password, full_name, phone_number, email, date_of_birth}) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt);
        const result = await query(
            'INSERT INTO spsos (username, password, full_name, phone_number, email, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, hashPassword, full_name, phone_number, email, date_of_birth]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const findSpsoById = async (id) => {
    try {
        const spso = await query(
            'SELECT id, full_name, email, phone_number FROM spsos WHERE id = $1',
            [id]
        );
        return spso.rows[0];
    } catch (error) {
        throw error;
    }
}

export const findSpsoByEmail = async (email) => {
    try {
        const spso = await query(
            'SELECT id, full_name, email, phone_number FROM spsos WHERE email = $1',
            [email]
        );
        return spso.rows[0];
    } catch (error) {
        throw error;
    }
}

export const updatePassSpso = async (id, password) => {
    try {
        const hashPassword = bcrypt.hashSync(password);
        const result = await query(
            'UPDATE spsos SET password = $1 WHERE id = $2',
            [hashPassword, id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteSpso = async (id) => {
    try {
        const result = await query(
            'DELETE FROM spsos WHERE id = $1', [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}