import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        totalSold: { type: Number, required: false, default: 1 }, // This is for Home Page. Every purchase adds +1
        image_url: { type: String, required: false },
    },
    { timestamps: true }
);

export default itemSchema;