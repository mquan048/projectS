import { google } from "googleapis";
import { config } from "dotenv";
import fs from "fs";

config();

const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SCOPE = process.env.SCOPE;
const FOLDER_ID = process.env.FOLDER_ID

const jwtClient = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [SCOPE]);
jwtClient.authorize();

const drive = google.drive({
    version: "v3",
    auth: jwtClient,
});

export const upload = async (file) => {
    const createFile = await drive.files.create({
        requestBody: {
            name: file.filename,
            mimeType: file.mimetype,
            parents: [FOLDER_ID],
        },
        media: {
            mimeType: file.mimetype,
            body: fs.createReadStream(`./src/${file.filename}`),
        },
        fields: "id, webViewLink, webContentLink",
    });

    await drive.permissions.create({
        fileId: createFile.data.id,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    return createFile.data;
}

export const getUrl = async (document_id) => {
    const result = await drive.files.get({
        fileId: document_id,
        fields: "webViewLink, webContentLink"
    })
    return result.data;
}

export const remove = async (document_id) => {
    await drive.files.delete({
        fileId: document_id,
    })
}