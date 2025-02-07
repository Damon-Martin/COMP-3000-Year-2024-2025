import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image_url: { type: String, required: false },
    },
    { timestamps: true }
);

export default itemSchema;