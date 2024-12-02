import * as reportService from '../services/report.service.js'

export const countOrderInMonth = async (req, res) => {
    try {
        const result = await reportService.countOrderInMonth(req.params.year);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500);
    }
}