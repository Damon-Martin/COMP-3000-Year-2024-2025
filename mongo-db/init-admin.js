db = db.getSiblingDB('database'); // Selecting the DB

db['admin-details'].insertMany([
    {
        "email": "admin@example.com",
        "fName": "Jack",
        "lName": "Smith",
        "NiNumber": "SC421327M",
        "tel": "07479666585",
        "address": "123 Example Street",
        "postcode": "PL1 IPX",
        "__v": 0
    }
])

db['auth-collections'].insertMany([
    {
        "email": "admin@example.com",
        "password": "$2a$10$SFrUAA/o1EaTXBBKhxZjQu.M.fVn6C/y.gmlZIu5EuCaQsNJpCQvK",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "__v": 0
    }
])