import mongoose from 'mongoose';

const printerSchema = new mongoose.Schema(
    {
        printerID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        state: {
            type: String,
            enum: ['active', 'inactive', 'maintenance'],
            default: 'active'
        },
        location: {
            campus: {
                type: String,
                required: true
            },
            building: {
                type: String,
                required: true
            },
            room: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Printer', printerSchema);
