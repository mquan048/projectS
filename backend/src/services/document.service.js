import fs from "fs";
import { PDFDocument } from 'pdf-lib';
import { query } from "../config/db.js";
import * as drive from "../config/ggdrive.js";

const file_type = JSON.parse(fs.readFileSync('./src/config/file_type.json', 'utf-8'));

const countNumPage = async (filename) => {
    const fileBuffer = fs.readFileSync(`./src/${filename}`)
    const pdfDoc  = await PDFDocument.load(fileBuffer);
    return pdfDoc.getPageCount()
}

export const addDocument = async (file, user_id) => {
    try {
        const fileUpload = await drive.upload(file);
        const numPages = await countNumPage(file.filename);

        const result = await query(
            "INSERT INTO documents (document_id ,name, file_type, number_of_pages, user_id) VALUES ($1, $2, $3, $4, $5)",
            [fileUpload.id, file.filename, file_type[file.mimetype], numPages, user_id]
        );
        return result;

    } catch (error) {
        throw error;
    } finally {
        await fs.promises.unlink(`./src/${file.filename}`);
    }
};

export const getDocumentByUserId = async (user_id) => {
    try {
        const result = await query("SELECT document_id, name, file_type, number_of_pages FROM documents WHERE user_id = $1", [user_id]);
        const documents = result.rows;
        for (doc in documents) {
            const url = await drive.getUrl(doc.document_id);
            doc.webViewLink = url.webViewLink;
            doc.webContentLink = url.webContentLink;
        }
        return documents
    } catch (error) {
        throw error;
    }
}

export const getDocumentById = async (document_id) => {
    try {
        const result = await query("SELECT document_id, name, file_type, number_of_pages FROM documents WHERE document_id = $1", [document_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const deleteDocument = async (document_id, user_id) => {
    try {
        const result = await query("DELETE FROM documents WHERE document_id = $1 AND user_id", [document_id, user_id]);
        if (result.rowCount !== 0) {
            await drive.remove(document_id);
        }
        return result.rowCount !== 0;
    } catch (error) {
        throw error;
    }
}
