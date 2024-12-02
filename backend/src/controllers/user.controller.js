import * as userService from "../services/user.service.js"

export const getUserInfo = async (req, res) => {
    try{
        const user = await userService.findUserById(req.id)
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}