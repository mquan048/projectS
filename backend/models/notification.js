const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    Notify_ID: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    sent_time: { type: Date, default: Date.now },
    status: { type: String, enum: ['read', 'unread'], default: 'unread' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Notification', notificationSchema);
