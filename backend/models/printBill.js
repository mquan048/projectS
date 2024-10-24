const mongoose = require('mongoose');

const printBillSchema = new mongoose.Schema({
    Print_bill_ID: { type: String, required: true, unique: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    paper_size: { type: String },
    paper_orientation: { type: String },
    number_of_pages: { type: Number, required: true },
    number_of_sheets: { type: Number, required: true },
    scale: { type: Number },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('PrintBill', printBillSchema);
