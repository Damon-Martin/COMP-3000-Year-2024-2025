class ItemCategoriesController {
    constructor(categoriesModel) {
        this.categoriesModel = categoriesModel;
    }
    
    async addNewCategory(newCategory) {
        if (newCategory == null) {
            return {
                code: 400,
                error: "Missing Category in the req body to make a new category"
            };
        }

        if (newCategory == "") {
            return {
                code: 400,
                error: "New Categories can't be empty and need a length greater than 0"
            };
        }
        
        const newCategoryInst = new this.categoriesModel({
            categoryName: newCategory
        });

        try {
            await newCategoryInst.save();
            return {
                code: 200,
                msg: `Added new category successfully: ${newCategory}`
            };
        }
        catch (e) {
            return {
                code: 500,
                error: `${e}`
            };
        }
    }

    getListOfCategories(category) {}

    getItemsByCategory(category) {}

    addNewItem(itemDetails, category) {}

    searchForItemsByText() {}
}

export default ItemCategoriesController;