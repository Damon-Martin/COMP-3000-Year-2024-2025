import mongoose from 'mongoose';

class ItemCategoriesController {
    constructor(categoriesModel) {
        this.categoriesModel = categoriesModel;
    }
    
    async addNewCategory(categoryName, imageURL, itemsList) {
        if (!categoryName) {
            return {
                code: 400,
                error: "Missing or empty category name."
            };
        }
    
        try {
            // Check if category already exists
            const existingCategory = await this.categoriesModel.findOne({ categoryName });
            if (existingCategory) {
                return {
                    code: 409,
                    error: `Category '${categoryName}' already exists.`
                };
            }
    
            // Ensure itemsList is an array and convert to ObjectIds
            let uniqueItems = [];
            if (Array.isArray(itemsList)) {
                uniqueItems = [...new Set(itemsList)]
                    .filter(item => mongoose.Types.ObjectId.isValid(item)) // Ensures valid ObjectId
                    .map(item => new mongoose.Types.ObjectId(item)); // Convert to ObjectId
            }

            // Creates new category
            const newCategoryInst = new this.categoriesModel({
                categoryName: categoryName,
                imageURL: imageURL,
                items: uniqueItems.length > 0 ? uniqueItems : undefined // If no items the category exists
            });
    
            await newCategoryInst.save();
            return {
                code: 200,
                msg: `Added new category successfully: ${categoryName}`
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error: ${e.message}`
            };
        }
    }
    

    getListOfCategories(category) {}

    getItemsByCategory(category) {}

    addNewItem(itemDetails, category) {}

    searchForItemsByText() {}
}

export default ItemCategoriesController;