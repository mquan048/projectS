import * as printerService  from '../services/printer.service.js';

export const addPrinter = async (req, res) => {
    try {
        const dataForm = req.body;
        await printerService.addPrinter(dataForm);
        return res.status(201).json({
            message: "Add printer successfully!"});
    } catch (error) {
        console.error(error);
        return res.status(500);
    } 
}

export const getAllPrinters = async (req, res) => {
    try {
        const printers = await printerService.getAllPrinters()
        return res.status(200).json(printers);
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

export const getPrinter = async (req, res) => {
    try {
        const printer = await printerService.getPrinter(req.params.id)
        return res.status(200).json(printer);
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

export const changeState = async (req, res) => {
    try {
        await printerService.changeState(req.params.id, req.body.state);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

export const updateInfo = async (req, res) => {
    try {
        await printerService.updateInfo(req.params.id, req.body);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

export const deletePrinter = async (req, res) => {
    try {
        const result = printerService.deletePrinter(req.params.id);
        if(result) {
            return res.status(200).json({
                message: 'OK!',
            })
        } else {
            return res.status(404).json({
                message: 'Not found!',
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}