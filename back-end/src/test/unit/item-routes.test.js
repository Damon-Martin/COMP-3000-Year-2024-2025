import { assert } from 'chai';

const BackendURI = "http://localhost:82";
const AuthURI = "http://localhost:81";

describe("Unit Tests: Item Routes", () => {
    let token;

    before(async () => {
        const adminLoginDetails = { email: "admin@example.com", password: "password" };
        const res = await fetch(`${AuthURI}/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminLoginDetails)
        });

        const data = await res.json();
        token = data.token;
    });

    it("Create new Item with valid obj but valid category. Expect STATUS 200", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        // Valid Category that exists
        const newItem = {
            "categoryID": "67f9dd4f713c94334e2c3b04",
            "itemDetails": {
                "itemName": "Leather Jacket",
                "imageURL": "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
                "altImgTxt": "Image of a leather jacket",
                "itemDescription": "A stylish leather jacket perfect for all seasons.",
                "price": 99.99
            }
        };

        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        });

        const data = await res.json();
        
        assert.equal(res.status, 200, data.error);
    });

    it("Create new Item with valid obj but invalid category. Expect STATUS 400", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        // Category does not exist
        const newItem = {
            "categoryID": "67bd14d7e13b0d81ae113f85",
            "itemDetails": {
                "itemName": "Leather Jacket",
                "imageURL": "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
                "altImgTxt": "Image of a leather jacket",
                "itemDescription": "A stylish leather jacket perfect for all seasons.",
                "price": 99.99
            }
        };

        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        });

        const data = await res.json();
        
        assert.equal(res.status, 400, data.error);
    });

    it("Expect STATUS 400 if invalid newItem Obj provided", async () => {
        // missing required fields
        const invalidItem = {
            "categoryID": "",
            "itemDetails": {}
        };

        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(invalidItem)
        });

        const data = await res.json();

        assert.equal(res.status, 400, data.error);
    });

    it("Expect STATUS 200 if valid newCategory Obj and is a NEW Category", async () => {
        const randomSuffix = Math.floor(Math.random() * 100000);
        const validCategory = {
            categoryName: `Men's T-Shirts ${randomSuffix}`,
            imageURL: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
            altImgTxt: "Image of a Jacket",
            items: [
                "67bd14d7e13b0d81ae113f85",
                "67bd152ce13b0d81ae113f88"
            ]
        };

        const res = await fetch(`${BackendURI}/v1/items/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(validCategory)
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
    });


    it("Expect STATUS 409 if valid newCategory Obj but category already exists", async () => {
        const validCategory = {
            categoryName: `Furniture`,
            imageURL: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
            altImgTxt: "Image of a Jacket",
            items: [
                "67bd14d7e13b0d81ae113f85",
                "67bd152ce13b0d81ae113f88"
            ]
        };

        const res = await fetch(`${BackendURI}/v1/items/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(validCategory)
        });

        const data = await res.json();
        assert.equal(res.status, 409, data.error);
    });

});
