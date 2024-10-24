const mongoose = require('mongoose');

const pageOrderSchema = new mongoose.Schema({
    transaction_ID: { type: String, required: true, unique: true },
    transaction_time: { type: Date, default: Date.now },
    number_of_A4_pages: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('PageOrder', pageOrderSchema);
