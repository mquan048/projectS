import { query } from '../config/db.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const createUser = async ({full_name, email, password, date_of_birth, available_a4_pages}) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt);
        const result = await query(
            'INSERT INTO users (full_name, email, password, date_of_birth, available_a4_pages) VALUES ($1, $2, $3, $4, $5)',
            [full_name, email, hashPassword, date_of_birth, available_a4_pages]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const findUserById = async (id) => {
    try {
        const user = await query(
            'SELECT id, full_name, email, available_a4_pages FROM users WHERE id = $1',
            [id]
        );
        return user.rows[0];
    } catch (error) {
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await query(
            'SELECT id, full_name, email, available_a4_pages FROM users WHERE email = $1',
            [email]
        );
        return user.rows[0];
    } catch (error) {
        throw error;
    }
}

export const descAvailabePage = async (user_id, num) => {
    try {
        const result = await query('UPDATE users SET available_a4_pages = available_a4_pages - $1 WHERE id = $2', [num, user_id])
        return result;
    } catch (error) {
        throw error;
    }
}

export const incrAvailabePage = async (user_id, num) => {
    try {
        const result = await query('UPDATE users SET available_a4_pages = available_a4_pages + $1 WHERE id = $2', [num, user_id])
        return result;
    } catch (error) {
        throw error;
    }
}

export const updatePassUser = async (id, password) => {
    try {
        const hashPassword = bcrypt.hashSync(password);
        const result = await query(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashPassword, id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const result = await query(
            'DELETE FROM users WHERE id = $1', [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}