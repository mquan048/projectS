import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const spsoSchema = new mongoose.Schema(
    {
        spsoID: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        phoneNumber: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, 'Please enter a valid phone number']
        },
        dateOfBirth: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

spsoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('SPSO', spsoSchema);
