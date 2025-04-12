db = db.getSiblingDB('database'); // Selecting the DB

// Ensuring there is at least 1 patient during initialization
db.items.insertMany([
    {
        "_id":  ObjectId('67f6a1b7c02fe16921544ca7'),
        "name": "Leather Jacket",
        "description": "A stylish leather jacket perfect for all seasons.",
        "price": 29.99,
        "totalSold": 30,
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
        "totalSold": 600,
        "imageUrl": "https://c.pxhere.com/photos/4d/92/coat_daylight_girl_guard_rail_horizon_landscape_mountains_ocean-1495585.jpg!d",
        "altImgTxt": "Image of a Rain Coat",
        "createdAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "updatedAt": {
          "$date": "2025-04-09T16:13:47.296Z"
        },
        "__v": 0
    },
    {
      "_id": ObjectId('67f6a1b7c02fe16921544ca6'),
      "name": "Men's Smart Trousers",
      "description": "Smart trousers at an affordable price in the grey colour",
      "price": 15.99,
      "totalSold": 90,
      "imageUrl": "https://media.istockphoto.com/id/532278616/photo/perfect-match.jpg?s=612x612&w=0&k=20&c=mdMGXG-gb2ByZV2O0zMhI4C6oDGGkIOmKk_cvTCvDZI=",
      "altImgTxt": "Image of Normal Trousers",
      "createdAt": {
        "$date": "2025-04-09T16:13:47.296Z"
      },
      "updatedAt": {
        "$date": "2025-04-09T16:13:47.296Z"
      },
      "__v": 0
    },
    {
      "_id": ObjectId("67f9e0b74e238a98ee03f327"),
      "name": "Black Kubus Sofa",
      "description": "A black kubus sofa for you and your family. Loved by guests.",
      "price": 499.99,
      "totalSold": 2,
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Kubus_sofa.jpg",
      "altImgTxt": "Image of a black kubus sofa",
      "createdAt": {
        "$date": "2025-04-12T03:40:39.034Z"
      },
      "updatedAt": {
        "$date": "2025-04-12T03:40:39.034Z"
      },
      "__v": 0
    },
    {
      "_id": ObjectId("67f9e28230470f8e5b58c7c6"),
      "name": "Microwave 900W",
      "description": "A Premium Silver Microwave 900W",
      "price": 49.99,
      "totalSold": 30,
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Microwave_oven.jpg/2560px-Microwave_oven.jpg",
      "altImgTxt": "Image of a Silver Microwave 900W",
      "createdAt": {
        "$date": "2025-04-12T03:48:18.613Z"
      },
      "updatedAt": {
        "$date": "2025-04-12T03:48:18.613Z"
      },
      "__v": 0
  },
  {
      "_id": ObjectId("67f9e2c930470f8e5b58c7ca"),
      "name": "Microwave 750W",
      "description": "A Silver Microwave 750W at a medium cost",
      "price": 39.99,
      "totalSold": 1,
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silver_GE_Microwave.jpg/1200px-Silver_GE_Microwave.jpg",
      "altImgTxt": "Image of a Silver Microwave 750W",
      "createdAt": {
        "$date": "2025-04-12T03:49:29.620Z"
      },
      "updatedAt": {
        "$date": "2025-04-12T03:49:29.620Z"
      },
      "__v": 0
  },
  {
    "_id": ObjectId("67f9e41830470f8e5b58c7ce"),
    "name": "Silver Fridge",
    "description": "A Silver Fridge suitable for a small family",
    "price": 399.99,
    "totalSold": 1,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/ExpensiveRefrigerators.JPG/800px-ExpensiveRefrigerators.JPG",
    "altImgTxt": "Image of a Silver Fridge",
    "createdAt": {
      "$date": "2025-04-12T03:55:04.647Z"
    },
    "updatedAt": {
      "$date": "2025-04-12T03:55:04.647Z"
    },
    "__v": 0
  },
  {
    "_id": ObjectId("67f9e69e448c7c2d61c54ee1"),
    "name": "Wooden Bunny Toy",
    "description": "A Wooden Bunny Toy suitable for toddlers",
    "price": 4.99,
    "totalSold": 0,
    "imageUrl": "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2JzNzQ1LWltYWdlLWt3dng1ODFqLmpwZw.jpg",
    "altImgTxt": "Image of a Wooden Bunny Toy",
    "createdAt": {
      "$date": "2025-04-12T04:05:50.188Z"
    },
    "updatedAt": {
      "$date": "2025-04-12T04:05:50.188Z"
    },
    "__v": 0
  },
  {
    "_id": ObjectId("67f9e72c448c7c2d61c54ee5"),
    "name": "Rideable Horse Toy",
    "description": "A Rideable Horse Toy suitable for toddlers",
    "price": 29.99,
    "totalSold": 20,
    "imageUrl": "https://live.staticflickr.com/1674/24537498686_c11437351f_o.jpg",
    "altImgTxt": "Image of a Rideable Horse Toy",
    "createdAt": {
      "$date": "2025-04-12T04:08:12.004Z"
    },
    "updatedAt": {
      "$date": "2025-04-12T04:08:12.004Z"
    },
    "__v": 0
  }
]);