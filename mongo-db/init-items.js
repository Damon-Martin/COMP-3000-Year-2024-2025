db = db.getSiblingDB('database'); // Selecting the DB

// Ensuring there is at least 1 patient during initialization
db.items.insertMany([
    {
        "_id":  ObjectId('67f6a1b7c02fe16921544ca7'),
        "name": "Leather Jacket",
        "description": "A stylish leather jacket perfect for all seasons.",
        "price": 29.99,
        "totalSold": 0,
        "imageUrl": "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
        "altImgTxt": "Image of a leather jacket",
        "createdAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "updatedAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "__v": 0
    },
    {
        "_id": ObjectId('67f6a1b7c02fe16921544ca8'),
        "name": "Rain Coat",
        "description": "A rain coat which is designed to withstand the British Weather and Climate during storms",
        "price": 99.99,
        "totalSold": 0,
        "imageUrl": "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpghttps://c.pxhere.com/photos/4d/92/coat_daylight_girl_guard_rail_horizon_landscape_mountains_ocean-1495585.jpg!d",
        "altImgTxt": "Image of a Rain Coat",
        "createdAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "updatedAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "__v": 0
    }
]);