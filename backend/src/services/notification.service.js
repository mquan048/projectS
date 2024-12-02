import { query } from "../config/db.js"


export const getNotify = async (user_id) => {
    try {
        const result = await query("SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5" [user_id])
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const viewNotify = async (notification_id, user_id) => {
    try {
        const result = await query(
            "UPDATE notifications SET status = 'read' WHERE notification_id =  $1 AND user_id = $2",
            [notification_id, user_id]
        )
        return result.rowCount !== 0
    } catch (error) {
        throw error;
    }
}

export const viewAll = async (user_id) => {
    try {
        await query("UPDATE notifications SET status = 'read' WHERE user_id = $1", [user_id])
    } catch(error) {
        throw error;
    }
}

export const deleteNotify = async (notification_id, user_id) => {
    try {
        const result = await query(
            'DELETE FROM notifications WHERE notify_id = $1 AND user_id = $2',
            [notification_id, user_id]
        )
        return result.rowCount !== 0;
    } catch (error) {
        throw error;
    }
}

export const deleteAll = async (user_id) => {
    try {
        await query('DELETE FROM notifications WHERE  user_id = $1',[user_id],);
    } catch (error) {
        throw error
    }
}
