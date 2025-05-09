import mongoose from 'mongoose';

class ItemCategoriesController {
    constructor(categoriesModel, itemsModel) {
        this.categoriesModel = categoriesModel;
        this.itemsModel = itemsModel;
    }
    
    async addNewCategory(categoryName, imageURL, altImgTxt, itemsList ) {
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
                altImgTxt: altImgTxt,
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
    

    async getListOfCategories() {
        try {
            // specify fields wanted using 1 and omit id
            const categories = await this.categoriesModel.find({}, { categoryName: 1, imageURL: 1, altImgTxt: 1 });

            return {
                code: 200,
                msg: "Successfully retrieved list of Categories",
                categories: categories
            };
        } 
        catch (e) {
            console.error("Error in getListOfCategories:", e);  // Loggin the error for debugging
            return {
                code: 500,
                error: "Internal Server Error"
            };
        }
    }
    
    // N is the number of items to return
    async listOfItemsByNumberSold(n) {}

    async getItemsByCategoryID(categoryID) {
        try {
            // Validate categoryID
            if (!categoryID || categoryID.trim() === "") {
                return {
                    code: 400,
                    error: "Missing CategoryID in the request body"
                };
            }

            if (!mongoose.Types.ObjectId.isValid(categoryID)) {
                return {
                    code: 400,
                    error: "categoryID needs to be a valid Mongoose ObjectID"
                };
            }
            
            // Retrieve category document that contains item IDs
            const category = await this.categoriesModel.findOne({ _id: categoryID });
            
            // If category doesn't exist, return 404
            if (!category) {
                return {
                    code: 404,
                    error: "Category not found so no item ids returned"
                };
            }
    
            // Extracting item IDs from the category
            const itemIDs = category.items || [];

            // Retrieve the actual item documents
            const items = await this.itemsModel.find({
                _id: { $in: itemIDs }
            });


            return {
                code: 200,
                categoryName: category.categoryName,
                msg: "Successfully retrieved list of Item IDs",
                items: items
            };
        } 
        catch (e) {
            console.error("Error in getItemsByCategoryID:", e); // Proper error logging
            return {
                code: 500,
                error: "Internal Server Error"
            };
        }
    }
    
    // Items do not have a category id however this item is added to a categories item
    // Deals with 2 entities ItemsCollection & CategoryCollection (products attribute)
    async addNewItem(itemDetails, categoryID) {
        try {
            // Validate categoryID exists
            if (!categoryID || categoryID.trim() === "") {
                return {
                    code: 400,
                    error: "Missing CategoryID in the request body"
                };
            }

            // Retrieve category document that contains item IDs
            const category = await this.categoriesModel.findOne({ _id: categoryID });
                
            // If category doesn't exist, return 404
            if (!category) {
                return {
                    code: 400,
                    error: "Category does not exist"
                };
            }

            // Validate itemDetails expected values are not null
            if (!itemDetails.itemName || !itemDetails.price || !itemDetails.imageURL || !itemDetails.altImgTxt || !itemDetails.itemDescription) {
                return {
                    code: 400,
                    error: "Missing ItemDetails needs all attributes"
                };
            }

            // Creates new item
            const newItemInst = new this.itemsModel({
                name: itemDetails.itemName,
                description: itemDetails.itemDescription,
                price: itemDetails.price,
                imageUrl: itemDetails.imageURL,
                altImgTxt: itemDetails.altImgTxt
            });

            const dbInst = await newItemInst.save();
    
            // adds item to category
            category.items.push(dbInst._id);
            category.save();

            return {
                code: 200,
                msg: "Item Saved"
            }
        }
        catch(e) {
            return {
                code: 500,
                error: e
            }
        }
    }

    async getItemByID(ItemID) {
        if (!ItemID) {
            return {
                code: 400,
                error: "Missing ItemID"
            }
        }

        try {
            // Retrieve category document that contains item IDs
            const item = await this.itemsModel.findOne({ _id: ItemID });
                
            // If category doesn't exist, return 404
            if (!item) {
                return {
                    code: 404,
                    error: "Item not found"
                };
            }

            return {
                code: 200,
                item: item
            }
        }
        catch (e) {
            return {
                code: 500,
                error: e
            }
        }
    }

    async getAllItemsByPopularity() {
        try {
            // Getting all items them by sort by price
            // 1 for ascending order, -1 for descending order
            const items = await this.itemsModel.find({}).sort({ price: 1 }); 
    
            return {
                code: 200,
                msg: "Successfully retrieved all items ordered by Amount Sold",
                items: items
            };
        }
        catch (e) {
            console.error("Error in getAllItemsByPopularity:", e);
            return {
                code: 500,
                error: "Internal Server Error"
            };
        }
    }
    
    async searchItemsByText(query) {
        if (!query || query.trim() === "") {
            return {
                code: 400,
                error: "Search query cannot be empty"
            };
        }

        try {
            // Case-insensitive search in name and description
            const items = await this.itemsModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } }, // Searching inside the item's name
                ]
            });

            return {
                code: 200,
                items: items
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error: ${e.message}`
            };
        }
    }

    async updateItemByID(itemID, updatedFields) {
        if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
            return {
                code: 400,
                error: "Invalid or missing itemID"
            };
        }
    
        try {
            const updatedItem = await this.itemsModel.findByIdAndUpdate(
                itemID,
                { $set: updatedFields },
                { new: true }
            );
    
            if (!updatedItem) {
                return {
                    code: 404,
                    error: "Item not found"
                };
            }
    
            return {
                code: 200,
                msg: "Item updated successfully",
                item: updatedItem
            };
        } catch (e) {
            return {
                code: 500,
                error: `Server error while updating item: ${e.message}`
            };
        }
    }
    
    async updateCategoryByID(categoryID, updatedFields) {
        if (!categoryID || !mongoose.Types.ObjectId.isValid(categoryID)) {
            return {
                code: 400,
                error: "Invalid or missing categoryID"
            };
        }
    
        try {
            const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
                categoryID,
                { $set: updatedFields },
                { new: true }
            );
    
            if (!updatedCategory) {
                return {
                    code: 404,
                    error: "Category not found"
                };
            }
    
            return {
                code: 200,
                msg: "Category updated successfully",
                category: updatedCategory
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error while updating category: ${e.message}`
            };
        }
    }    

    async deleteItemByID(itemID) {
        if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
            return {
                code: 400,
                error: "Invalid or missing itemID"
            };
        }
    
        try {
            // Remove item from all categories
            await this.categoriesModel.updateMany(
                { items: itemID },
                { $pull: { items: itemID } }
            );
    
            // Delete item from the database
            const deletedItem = await this.itemsModel.findByIdAndDelete(itemID);
    
            if (!deletedItem) {
                return {
                    code: 404,
                    error: "Item not found"
                };
            }
    
            return {
                code: 200,
                msg: "Item deleted successfully"
            };
        }
        catch (e) {
            return {
                code: 500,
                error: `Server error while deleting item: ${e.message}`
            };
        }
    }
    
    async deleteCategoryByID(categoryID) {
        if (!categoryID || !mongoose.Types.ObjectId.isValid(categoryID)) {
            return {
                code: 400,
                error: "Invalid or missing categoryID"
            };
        }
    
        try {
            const deletedCategory = await this.categoriesModel.findByIdAndDelete(categoryID);
    
            if (!deletedCategory) {
                return {
                    code: 404,
                    error: "Category not found"
                };
            }
    
            return {
                code: 200,
                msg: "Category deleted successfully"
            };
        }
        catch (e) {
            return {
                code: 500,
                error: `Server error while deleting category: ${e.message}`
            };
        }
    }    

}

export default ItemCategoriesController;