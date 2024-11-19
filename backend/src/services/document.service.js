

import { query } from "../config/db.js";

export const addDocument = async ({ document_id, name, file_type, number_of_pages }) => {
    try {
        const result = await query(
            "INSERT INTO documents (document_id ,name, file_type, number_of_pages) VALUES ($1, $2, $3, $4)",
            [document_id, name, file_type, number_of_pages]
        );
        return result;

    } catch (error) {
        throw error;
    }
};

export const getDocumentById = async (document_id) => {
    try {
        const result = await query("SELECT * FROM documents WHERE document_id = $1", [document_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const getDocuments = async () => {
    try {
        const result = await query("SELECT * FROM documents");
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const deleteDocument = async (document_id) => {
    try {
        const result = await query("DELETE FROM documents WHERE document_id = $1", [document_id]);
        return result;
    } catch (error) {
        throw error;
    }
}
