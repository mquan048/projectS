const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    document_ID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    file_type: { type: String, required: true },
    number_of_pages: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Document', documentSchema);
