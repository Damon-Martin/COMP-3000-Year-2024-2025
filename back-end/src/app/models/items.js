import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        totalSold: { type: Number, required: false, default: 1 }, // This is for Home Page. Every purchase adds +1
        imageUrl: { type: String, required: true },
        altImgTxt: { type: String, required: true },
    },
    { timestamps: true }
);

const ItemsModel = mongoose.model('Items', itemSchema);

export default ItemsModel;