db = db.getSiblingDB('database'); // Selecting the DB

// Ensuring there is at least 1 patient during initialization
db.categories.insertMany([
    {
        "_id":  ObjectId('67f9cda665cc443c20c9a761'),
        "categoryName": "Clothing",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG/1600px-Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG?2012123013263",
        "altImgTxt": "Image of Clothing",
        "items": [ ObjectId('67f6a1b7c02fe16921544ca7'), ObjectId('67f6a1b7c02fe16921544ca8'), ObjectId('67f6a1b7c02fe16921544ca6')],
        "__v": 0
    },
    {
        "_id": ObjectId("67f9dd4f713c94334e2c3b04"),
        "categoryName": "Kitchen Appliances",
        "imageURL": "https://live.staticflickr.com/7012/6736237505_27f2b796a5_b.jpg",
        "altImgTxt": "Image of a Kitchen Appliances",
        "items": [ ObjectId("67f9e41830470f8e5b58c7ce"), ObjectId("67f9e2c930470f8e5b58c7ca"), ObjectId("67f9e28230470f8e5b58c7c6")],
        "__v": 0
    },
    {
        "_id": ObjectId("67f9de9c713c94334e2c3b07"),
        "categoryName": "Furniture",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Kubus_sofa.jpg",
        "altImgTxt": "Image of Furniture",
        "items": [ ObjectId("67f9e0b74e238a98ee03f327") ],
        "__v": 0
    },
    {
        "_id": ObjectId("67f9df26713c94334e2c3b0a"),
        "categoryName": "Toys",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/7/71/Modern_Toys%2C_Japan_1958-001.jpg",
        "altImgTxt": "Image of Toys",
        "items": [ ObjectId("67f9e72c448c7c2d61c54ee5"), ObjectId("67f9e69e448c7c2d61c54ee1") ],
        "__v": 0
    },
])






