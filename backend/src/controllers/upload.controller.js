import * as uploadService from '../services/spaces.service.js';

export const upload = async (req, res) => {
    try {
        await uploadService.uploadFile(req.file, req.id);

        return res.status(200).json({
            message: "OK!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

export const remove = async (req, res) => {
    try {
        const result = await uploadService.deleteFile(req.param.id, req.id)
        if(result) {
            return res.status(200).json({
                message: "OK!",
            });
        } else {
            return res.status(403).json({
                message: "Forbidden!",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}
