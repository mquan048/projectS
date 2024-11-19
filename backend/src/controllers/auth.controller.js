import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';
import * as spsoService from '../services/spso.service.js';

export const signup = async (req, res) => {
    try {
        const formData = req.body;

        //Nếu database có thêm CHECK rồi thì khỏi cần kiểm tra
        const user = (
            formData.role === 'SPSO'
                ? await spsoService.findSpsoByEmail(formData.username)
                : await userService.findUserByEmail(formData.email)
        );
        if (user) {
            return res.status(400).json({
                message: 'Username / email already exist!'
            });
        }
        //

        if (formData.role === 'SPSO') {
            await spsoService.createSpso(formData);
        } else {
            await userService.createUser(formData);
        }
        return res.status(201).json({
            message: 'Create user successfully!',
            data: {
                email: formData.email,
            }
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

export const signin = async (req, res) => {
    try {
        const formData = req.body;
        const roleUser = await authService.validUser(formData.email, formData.password);
        if (roleUser) {
            const accessToken = await authService.accessToken(formData.email, roleUser);
            return res.status(200).json({
                message: 'Login successfully!',
                data: {
                    email: formData.email,
                    role: roleUser,
                    accessToken: accessToken,
                }
            })
        } else {
            return res.status(401).json({
                message: 'Unathorized!'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

export const authorize = async (req, res) => {
    try {
        const result = await authService.verifyToken(req.headers.authorization?.split(' ')[1])
        return res.status(200).json(result);
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