db = db.getSiblingDB('database'); // Selecting the DB

db['customer-details'].insertMany([
    {
    "_id": ObjectId("680169df8f87c834cf3ab533"),
    "email": "david.smith@gmail.com",
    "fName": "David",
    "lName": "Smith",
    "tel": "07378999464",
    "address": "123 Example Street",
    "postcode": "PL1 1TU",
    "__v": 0
    }
])

db['auth-collections'].insertMany([
    {
        "_id": ObjectId("680169df8f87c834cf3ab532"),
        "email": "david.smith@gmail.com",
        "password": "$2a$10$MYbqgVf3yZ4WnM915EcVM.OjgHn6oq3AX.DaFg1DQHhbM5Sa08MOa",
        "created_At": {
            "$date": "2025-04-17T20:51:43.829Z"
        },
        "updated_At": {
            "$date": "2025-04-17T20:51:43.829Z"
        },
        "__v": 0
    }
])