db = db.getSiblingDB('database'); // Selecting the DB

db['admin-details'].insertMany([
    {
        "username": "admin",
        "fName": "Jack",
        "lName": "Smith",
        "NiNumber": "SC912924B",
        "tel": "07479888432",
        "address": "123 Example Street",
        "postcode": "PL1 2EX",
        "__v": 0
      }
])

db['auth-collections'].insertMany([
    {
        "username": "admin",
        "password": "$2a$10$cqEwqoTecwqqWQ7he4WFBeI6AAUDUBQvICr4gzr0DaOfhqaC3BPJe",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "__v": 0
    }
])