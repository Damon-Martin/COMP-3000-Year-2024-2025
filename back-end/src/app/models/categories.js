import mongoose from 'mongoose';
import itemSchema from './itemSchema.js';

const categoriesSchema = new mongoose.Schema(
    {
        // Category Name
        categoryName: { type: String, required: true, unique: true },
        imageURL: { type: String, required: false },
        // List of items that is in this category
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
    }
);

const CategoriesModel = mongoose.model('Categories', categoriesSchema);

export default CategoriesModel;