import { assert } from 'chai';

const BackendURI = "http://localhost:82";
const AuthURI = "http://localhost:81";

describe("Unit Tests: Item Routes", () => {
    let token;

    // Before the tests make an admin token to be re-used (making tests cleaner)
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

        // Arrange: New Item with valid category ID that will be POSTED
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

        // Act: Performing POST Req
        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        });

        const data = await res.json();
        
        // Assert: Checking is successful
        assert.equal(res.status, 200, data.error);
    });

    it("Create new Item with valid obj but invalid category. Expect STATUS 400", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token"); // Dependency: Checking failure is not this cause

        // Arrange: New Item with invalid category ID
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

        // Act: Performing POST Req
        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        });

        const data = await res.json();
        
        // Assert: User has selected a category that does not exist so it should be 400
        assert.equal(res.status, 400, data.error);
    });

    it("Expect STATUS 400 if invalid newItem Obj provided", async () => {
        // Arrange: Item is missing required fields
        const invalidItem = {
            "categoryID": "",
            "itemDetails": {}
        };

        // Act: POST Req for new Item
        const res = await fetch(`${BackendURI}/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(invalidItem)
        });

        const data = await res.json();

        // Assert: checking this failed
        assert.equal(res.status, 400, data.error);
    });

    it("Expect STATUS 200 if valid newCategory Obj and is a NEW Category", async () => {
        // Arrange: Making new data for new category
        const randomSuffix = Math.floor(Math.random() * 100000); // Ensures randomness
        const validCategory = {
            categoryName: `Men's T-Shirts ${randomSuffix}`,
            imageURL: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
            altImgTxt: "Image of a Jacket",
            items: [
                "67bd14d7e13b0d81ae113f85",
                "67bd152ce13b0d81ae113f88"
            ]
        };

        // Act: Perform POST Req with new cat data
        const res = await fetch(`${BackendURI}/v1/items/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(validCategory)
        });

        // Asserting: POST new cat worked with valid data and not taken
        const data = await res.json();
        assert.equal(res.status, 200, data.error);
    });


    it("Expect STATUS 409 if valid newCategory Obj but category already exists", async () => {
        // Arrange: Making new category (However the category Name is already taken)
        const validCategory = {
            categoryName: `Furniture`,
            imageURL: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg",
            altImgTxt: "Image of a Jacket",
            items: [
                "67bd14d7e13b0d81ae113f85",
                "67bd152ce13b0d81ae113f88"
            ]
        }; 

        // Act: Performing POST REQ when a category already exists with that name
        const res = await fetch(`${BackendURI}/v1/items/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(validCategory)
        });

        // Assert: Checking if a collision has taken place
        const data = await res.json();
        assert.equal(res.status, 409, data.error);
    });

    it("EXPECT STATUS 200 when GET /v1/items/sorted-by-popularity ", async () => {
        // Act: Perform Get Req for all items by popularity
        const res = await fetch(`${BackendURI}/v1/items/sorted-by-popularity`);
        const data = await res.json();


        // Assert: Request is ok and its an array (checking datatype)
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.items);
    });

    it("Checking GET /v1/items/all-categories is an array and has STATUS 200", async () => {
        // Act: Perform GET all categories
        const res = await fetch(`${BackendURI}/v1/items/all-categories`);
        const data = await res.json();

        // Assert: Request is ok and its an array (checking datatype)
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.categories);
    });


    it("Should fail if Invalid CategoryID and should have STATUS 400 when getting its items", async () => {
        // Act: Perform GET on invalid Category ID
        const res = await fetch(`${BackendURI}/v1/items/all-items-by-categoryID?categoryID=invalid123`);
        const data = await res.json();

        // Assert: Bad Req (Users fault)
        assert.equal(res.status, 400, data.error);
    });

    it("Should pass if valid search query and return an array", async () => {
        // Act: Perform GET REQ of search query
        const res = await fetch(`${BackendURI}/v1/items/search?query=tr`);
        const data = await res.json();

        // Assert: Request is ok and its an array
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.items);
    });

    it("Should pass if Update item that exists should give STATUS 200 and item exits", async () => {
        // Arrange: New Item Data to change it with
        const updatedFields = {
            name: "Updated Jacket Name",
            description: "Now warmer and trendier",
            price: 88.88,
            imageUrl: "https://updated.image/jacket.jpg",
            altImgTxt: "Updated Alt Text"
        };

        // Act: Update request on a valid itemID
        const res = await fetch(`${BackendURI}/v1/items/67f6a1b7c02fe16921544ca8`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedFields)
        });

        // Assert: This succeeded
        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.exists(data.item);
    });

    it("Should pass if Update item that DOES NOT exist should give STATUS 400", async () => {
        // Arrange: New data to update item with
        const updatedFields = {
            name: "Updated Jacket Name",
            description: "Now warmer and trendier",
            price: 88.88,
            imageUrl: "https://updated.image/jacket.jpg",
            altImgTxt: "Updated Alt Text"
        };

        // Act: Update invalid ItemID
        const res = await fetch(`${BackendURI}/v1/items/33n11`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedFields)
        });

        // Assert: Bad Request (Users fault)
        const data = await res.json();
        assert.equal(res.status, 400, data.error);
    });

    it("Should fail if Delete an item with an invalid ID Expect 400", async () => {
        // Act: Delete invalid ItemID
        const res = await fetch(`${BackendURI}/v1/items/invalidID123`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Assert: Bad Request (Users fault)
        const data = await res.json();
        assert.equal(res.status, 400);
    });

    it("Expect pass if valid categoryID and valid object for UPDATE", async () => {
        // Arrange: New Data to change the category
        const updatedCategory = {
            categoryName: "Updated Category",
            imageURL: "https://cdn.pixabay.com/photo.jpg",
            altImgTxt: "Updated Alt Text"
        };

        // Act: Perform update category
        const res = await fetch(`${BackendURI}/v1/items/update-category/67f9dd4f713c94334e2c3b04`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedCategory)
        });

        // Assert: Valid
        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.property(data, "category");
    });

    it("Should fail if INVALID Category ID is used for DELETE Expect 400", async () => {
        // Act: Testing with invalid CategoryID
        const res = await fetch(`${BackendURI}/v1/items/delete-category/invalidCategoryID`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Should fail and not be ok and expect STATUS 400
        const data = await res.json();
        assert.equal(res.status, 400);
    });
});
