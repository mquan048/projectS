import * as printerService  from '../services/printer.service.js';

export const addPrinter = async (req, res) => {
    try {
        const dataForm = req.body;
        await printerService.addPrinter(dataForm);
        return res.status(200).json();
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
        const printer = await printerService.getPrinter(req.param.id)
        return res.status(200).json(printer);
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

export const changeState = async (req, res) => {
    try {
        await printerService.changeState(req.param.id, req.body.state);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

export const updateInfo = async (req, res) => {
    try {
        await printerService.updateInfo(req.param.id, req.body);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}