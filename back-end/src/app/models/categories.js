import mongoose from 'mongoose';
import itemSchema from './items.js';

const categoriesSchema = new mongoose.Schema(
    {
        // Category Name
        categoryName: { type: String, required: true, unique: true },
        imageURL: { type: String, required: false },
        // Alt Text for image for screen readers
        altImgTxt: { type: String, required: false },
        // List of items that is in this category
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
    }
);

const CategoriesModel = mongoose.model('Categories', categoriesSchema);

export default CategoriesModel;