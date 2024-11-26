import * as documentService from '../services/document.service.js';

export const addDocument = async (req, res) => {
    try {
        await documentService.addDocument(req.file, req.id);
        return res.status(201).json();
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const getDocumentByUserId = async (req, res) => {
    try {
        const documents = await documentService.getDocumentByUserId(req.id);
        return res.status(200).json(documents);
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

export const deleteDocument = async (req, res) => {
    try {
        const result = await documentService.deleteDocument(req.params.id, req.id);
        if(result) {
            return res.status(200).json({ message: 'Delete completed' });
        } else {
            return res.status(403).json({ message: 'Forbidden!' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};
