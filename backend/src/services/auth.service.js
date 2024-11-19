import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { query } from '../config/db.js';

config()

const typeRole = {
    'SPSO': 'spsos',
    'USER': 'users',
}

export const validUser = async (email, password) => {
    try {
        let user = await query(`SELECT id, email, password FROM spsos WHERE email = $1`, [email])
        let role = "SPSO";

        //if user is not spso
        if(user.rowCount === 0) {
            user = await query(`SELECT id, email, password FROM users WHERE email = $1`, [email]);
            role = "USER";
        }

        if(user.rowCount === 1) {
            return bcrypt.compareSync(password, user.rows[0].password) ? role : undefined
        }
        return undefined;
    } catch (error) {
        throw error;
    }
}

export const accessToken = async (email, role) => {
    try {
        const token = jwt.sign(
            {
                email,
                role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h'}
        )
        return token;
    } catch (error) {
        throw error;
    }
}

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //Check if the user has existed in the system
        const result = await query(`SELECT email FROM ${typeRole[decoded.role]} WHERE email = $1`,[decoded.email]);
    
        if (result.rowCount === 1) {
            return {
                ful_name: result.rows.ful_name,
                email: decoded.email,
                role: decoded.role,
            }
        }
    } catch (error) {
        throw error
    }
}