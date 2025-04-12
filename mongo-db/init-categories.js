db = db.getSiblingDB('database'); // Selecting the DB

// Ensuring there is at least 1 patient during initialization
db.categories.insertMany([
    {
        "_id":  ObjectId('67f9cda665cc443c20c9a761'),
        "categoryName": "Unisex",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG/1600px-Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG?2012123013263",
        "altImgTxt": "Image of a Unisex Clothing",
        "items": [ ObjectId('67f6a1b7c02fe16921544ca7'), ObjectId('67f6a1b7c02fe16921544ca8')],
        "__v": 0
    }
])






