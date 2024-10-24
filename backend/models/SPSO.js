const mongoose = require('mongoose');

const spsoSchema = new mongoose.Schema({
    ID_SPSO: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String },
    password: { type: String, required: true },
    date_of_birth: { type: Date },
});

module.exports = mongoose.model('SPSO', spsoSchema);
