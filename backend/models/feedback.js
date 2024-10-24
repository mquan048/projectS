const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    ID_feedback: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    vote: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
