import mongoose from 'mongoose';
import itemSchema from './itemSchema.js';

const categoriesSchema = new mongoose.Schema(
    {
        // Category Name
        categoryName: { type: String, required: true, unique: true },
        // List of items that is in this category
        items: { type: [ itemSchema ], default: [] }
    }
);

const CategoriesModel = mongoose.model('Categories', categoriesSchema);

export default CategoriesModel;