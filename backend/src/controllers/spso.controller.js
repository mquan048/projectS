import * as spsoService from "../services/spso.service.js"
import { allocatePageForAllUsers } from '../services/user.service.js';

export const getSpsoInfo = async (req, res) => {
    try{
        const spso = await spsoService.findSpsoById(req.id)
        return res.status(200).json(spso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error!'
        });
    }
}

export const allocatePages = async (req, res) => {
    try {
        await allocatePageForAllUsers(req.body.num_of_pages);
        return res.status(200).json({
            message: 'Allocate pages successfully!'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error!'
        })
    }
}