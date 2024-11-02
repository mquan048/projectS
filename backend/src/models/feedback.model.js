import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
        feedbackID: {
            type: String,
            required: true,
            unique: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        submissionDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Feedback', feedbackSchema);
