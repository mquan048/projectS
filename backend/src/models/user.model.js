import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
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
        availableA4Pages: {
            type: Number,
            default: 0
        },
        lastModified: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['client', 'SPSO'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);
