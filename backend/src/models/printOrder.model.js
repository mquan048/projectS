import mongoose from 'mongoose';

const printOrderSchema = new mongoose.Schema(
    {
        orderID: {
            type: String,
            required: true,
            unique: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        documentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true
        },
        printerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Printer',
            required: true
        },
        startTime: {
            type: Date,
            required: true,
            default: Date.now
        },
        endTime: {
            type: Date
        },
        printOptions: {
            sided: {
                type: String,
                enum: ['one-sided', 'two-sided'],
                required: true
            },
            paperSize: {
                type: String,
                enum: ['A4', 'A3', 'A5'],
                required: true
            },
            paperOrientation: {
                type: String,
                enum: ['portrait', 'landscape'],
                required: true
            },
            pagesPerSheet: {
                type: Number,
                required: true,
                min: 1
            },
            numberOfCopies: {
                type: Number,
                required: true,
                min: 1
            },
            scale: {
                type: Number,
                required: true,
                min: 1,
                max: 100
            }
        },
        PState: {
            type: String,
            enum: ['pending', 'printing', 'completed', 'failed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('PrintOrder', printOrderSchema);
