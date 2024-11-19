
import * as printOrderService from "../services/printOrder.service.js"

export const addPrintOrder = async (req, res) => {
    try {
        const dataForm = req.body;
        await printOrderService.addPrintOrder(dataForm);
        return res.status(201).json({ message: 'add print order successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getAllPrintOrders = async (req, res) => {
    try {
        const printOrders = await printOrderService.getAllPrintOrders();
        return res.status(200).json(printOrders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getPrintOrderById = async (req, res) => {
    try {
        const printOrder = await printOrderService.getPrintOrderById(req.params.id);
        return res.status(200).json(printOrder);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getPrintOrderByUserid = async (req, res) => {
    try {
        const printOrders = await printOrderService.getPrintOrderByUserid(req.query.user_id);
        return res.status(200).json(printOrders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};


export const deletePrintOrder = async (req, res) => {
    try {
        await printOrderService.deletePrintOrder(req.params.id);
        return res.status(200).json({ message: 'deleted successfully!!' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const changeState = async (req, res) => {
    try {
        let dataForm = req.body;
        dataForm.id = req.params.id;
        await printOrderService.changeState(dataForm);
        return res.status(200).json({ message: "Update successfully!!" });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const filter = async (req, res) => {
    try {
        let dataForm = req.query;
        const printOrders = await printOrderService.filter(dataForm);
        return res.status(200).json(printOrders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}