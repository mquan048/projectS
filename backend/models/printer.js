const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    ID_Print: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    model: { type: String },
    brand: { type: String },
    state: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active',
    },
    location: {
        campus: { type: String },
        building: { type: String },
        room: { type: String },
    },
});

module.exports = mongoose.model('Printer', printerSchema);
