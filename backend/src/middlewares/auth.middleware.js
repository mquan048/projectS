import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import * as spsoService from '../services/spso.service.js';
import * as userService from '../services/user.service.js';

config()

export const spsoPermission = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Unathorized!'
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const spso = await spsoService.findSpsoByEmail(decoded.email);
        if (!spso) {
            return res.status(404).json({
                message: 'Not found!'
            })
        }

        req.id = spso.id;
        next()

    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token is expired!"
            })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Token is invalid!"
            })
        } else {
            console.error(error);
            return res.status(500);
        }
    }
}

export const userPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401)
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await userService.findUserByEmail(decoded.email);
        if (!user) {
            return res.status(404).json({
                message: "Not found!"
            })
        }

        req.id = user.id;
        next();

    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token is expired!"
            })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Token is invalid!"
            })
        } else {
            console.error(error);
            return res.status(500);
        }
    }
}
