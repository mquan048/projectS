
import * as documentService from '../services/document.service.js';

export const addDocument = async (req, res) => {
    try {
        const dataForm = req.body;
        await documentService.addDocument(dataForm);
        return res.status(201).json();
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const document = await documentService.getDocumentById(req.params.id);
        return res.status(200).json(document);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getDocuments = async (req, res) => {
    try {
        const documents = await documentService.getDocuments();
        return res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const deleteDocument = async (req, res) => {
    try {
        await documentService.deleteDocument(req.params.id);
        return res.status(200).json({ message: 'Delete completed' });
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};
