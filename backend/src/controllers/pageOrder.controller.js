
import * as pageOrderService from "../services/pageOrder.service.js"

export const addPageOrder = async (req, res) => {
    try {
        req.body.price = req.body.number_of_a4_pages * 500;
        const dataForm = req.body
        await pageOrderService.addPageOrder(dataForm);
        return res.status(201).json();
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getAllPageOrders = async (req, res) => {
    try {
        const pageOrders = await pageOrderService.getAllPageOrders();
        return res.status(200).json(pageOrders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getPageOrderById = async (req, res) => {
    try {
        const pageOrder = await pageOrderService.getPageOrderById(req.params.id);
        return res.status(200).json(pageOrder);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getPageOrderByUserid = async (req, res) => {
    try {
        const pageOrders = await pageOrderService.getPageOrderByUserid(req.query.user_id);
        return res.status(200).json(pageOrders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const changeState = async (req, res) => {
    try {
        const dataForm = req.body;
        dataForm.id = parseInt(req.params.id);
        await pageOrderService.changeState(dataForm);
        return res.status(200).json({ message: 'update successfully!!!' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};




