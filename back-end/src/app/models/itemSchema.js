import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true, unique: true },
        price: { type: Number, required: true, unique: true },
        image_url: { type: String, required: false },
    },
    { timestamps: true }
);

export default itemSchema;