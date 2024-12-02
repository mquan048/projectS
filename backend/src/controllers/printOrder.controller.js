import * as printOrderService from "../services/printOrder.service.js"
import * as documentService from "../services/document.service.js"
import * as userService from "../services/user.service.js"

export const addPrintOrder = async (req, res) => {
    try {
        const dataForm = req.body;

        const document = await documentService.getDocumentById(dataForm.document_id);
        const pageNeedToPrint = printOrderService.calcPages(document.number_of_pages, dataForm);
        
        const user = await userService.findUserById(req.id);
        if(user.available_a4_pages < pageNeedToPrint) {
            return res.status(400).json({message: 'User do not have enough pages to print!'})
        }

        await printOrderService.addPrintOrder(req.id, document.id, dataForm);
        await userService.descAvailabePage(req.id, pageNeedToPrint);
        return res.status(201).json({ message: 'Add print order successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getAllPrintOrders = async (req, res) => {
    try {
        const printOrders = await printOrderService.getAllPrintOrders(req.query.page);
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

export const getPrintOrdersByUserid = async (req, res) => {
    try {
        const printOrders = await printOrderService.getPrintOrdersByUserid(req.id, req.query.page, req.query.status);
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