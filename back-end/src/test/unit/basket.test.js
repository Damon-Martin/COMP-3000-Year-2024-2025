import { assert } from 'chai';

const BackendURI = "http://localhost:82";
const AuthURI = "http://localhost:81";

describe("Unit Tests: Basket Routes", () => {
    let token;

    before(async () => {
        const loginDetails = { email: "david.smith@gmail.com", password: "password" };
        const res = await fetch(`${AuthURI}/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails)
        });

        const data = await res.json();
        token = data.token;
    });

    it("Add new item to basket with valid item should work", async () => {
        const payload = {
            newItem: {
                id: "67faa58d12f175d8d6240188",
                name: "Grey Hoodie",
                price: 19.99,
                description: "A trendy hoodie suitable for teens and adults",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Man_Hoodie_Salamanca_%28Unsplash%29.jpg",
                altImgTxt: "Image of a Grey Hoodie"
            },
            clientItems: [
                {
                    id: "67faa58d12f175d8d6240123",
                    name: "Red Hoodie",
                    price: 24.99,
                    description: "A bold red hoodie",
                    imageUrl: "https://example.com/red-hoodie.jpg",
                    altImgTxt: "Image of a Red Hoodie"
                }
            ]
        };

        const res = await fetch(`${BackendURI}/v1/basket/add-items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.equal(data.msg, "Successfully added items to basket");
    });

    it("Getting user basket should return an array of objects", async () => {
        const res = await fetch(`${BackendURI}/v1/basket/get-basket`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.basket);
    });

    it("Deleting item in basket should return an array and STATUS 200", async () => {
        // First get the basket to find an item to delete
        const basketRes = await fetch(`${BackendURI}/v1/basket/get-basket`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const basketData = await basketRes.json();

        if (!basketData.basket.length) {
            console.warn("No items in basket to delete. Skipping test.");
            return;
        }

        const itemToDelete = basketData.basket[0];

        const res = await fetch(`${BackendURI}/v1/basket/delete-item?id=${itemToDelete.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.basket);
    });

    it("Clearing Basket Should remove all items and expect an array of length 0", async () => {
        const res = await fetch(`${BackendURI}/v1/basket/clear-basket`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.isArray(data.basket);
        assert.equal(data.basket.length, 0, "Basket should be empty after clearing");
    });
});
