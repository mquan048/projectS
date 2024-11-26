import * as spsoService from "../services/spso.service.js"

export const getSpsoInfo = async (req, res) => {
    try{
        const spso = spsoService.findSpsoById(req.id)
        return res.status(200).json(spso);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}