import mongoose from 'mongoose';

const pageOrderSchema = new mongoose.Schema(
    {
        transactionID: {
            type: String,
            required: true,
            unique: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        numberOfA4Pages: {
            type: Number,
            required: true,
            min: 1
        },
        transactionTime: {
            type: Date,
            default: Date.now
        },
        Ostate: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('PageOrder', pageOrderSchema);
