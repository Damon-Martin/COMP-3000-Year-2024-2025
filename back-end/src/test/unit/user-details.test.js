
import { assert } from 'chai';

const BackendURI = "http://localhost:82";
const AuthURI = "http://localhost:81";

describe("Unit Tests: User Details Routes", () => {
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

    it("Should fetch user details with valid email. Expect STATUS 200", async () => {
        assert.isAbove(token.length, 0, "Invalid Token");

        let email = "david.smith@gmail.com";

        const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.isObject(data.user, "Returned data should contain user details as an object");
    });

    it("Should return STATUS 400 when email parameter is missing", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const res = await fetch(`${BackendURI}/v1/user-details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 400, data.error);
    });

    it("Should return STATUS 404 if user is not found", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const email = "nonexistentuser@example.com"; // Non-existing user email

        const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 404, data.error);
    });

    it("Should update user details with valid email and data. Expect STATUS 200", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");
    
        const email = "david.smith@gmail.com"; // Existing user email for this test
        const updateData = {
            fName: "UpdatedFirstName",
            lName: "UpdatedLastName",
            tel: "1234567890",
            address: "123 New Street",
            postcode: "ZX9 8YX"
        };
    
        const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });
    
        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.isObject(data.user, "User object should be returned");
        assert.equal(data.user.fName, updateData.fName);
        assert.equal(data.user.lName, updateData.lName);
        assert.equal(data.user.tel, updateData.tel);
    });
    

    it("Should return STATUS 400 if email or the update data is missing for update req", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const res = await fetch(`${BackendURI}/v1/user-details`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({})
        });

        const data = await res.json();
        assert.equal(res.status, 400, data.error);
    });

    it("Should return STATUS 404 if user not found during update", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const email = "nonexistentuser@example.com"; // Non-existing user email
        const updateData = {
            firstName: "UpdatedFirstName",
            lastName: "UpdatedLastName",
            phone: "1234567890"
        };

        const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        const data = await res.json();
        assert.equal(res.status, 404, data.error);
    });


    it("Should return STATUS 400 if email is missing for delete request", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const res = await fetch(`${BackendURI}/v1/user-details`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 400, data.error);
    });

    it("Should return STATUS 404 if user not found during delete", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");

        const email = "nonexistentuser@example.com"; // Non-existing user email

        const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        assert.equal(res.status, 404, data.error);
    });

    
    it("Should delete user details with valid email. Expect STATUS 200", async () => {
        assert.isAbove(token.length, 0, "Invalid Admin Token");
    
        // Part 1: Register a new random user to be deleted
        const randomEmail = `randomuser${Date.now()}@gmail.com`; // Generate a random email based on timestamp
        const randomPassword = "password";
        
        const registerData = {
            email: randomEmail,
            password: randomPassword,
            userDetails: {
                fName: "Random",
                lName: "User",
                tel: "07431234567",
                address: "123 Random Street",
                postcode: "AB1 2CD"
            }
        };
    
        const registerRes = await fetch(`${AuthURI}/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });
    
        const registerResponseData = await registerRes.json();
        assert.equal(registerRes.status, 200, "User registration failed.");
    
        // Part 2: Delete the newly registered user
        const deleteRes = await fetch(`${BackendURI}/v1/user-details?email=${randomEmail}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    
        const deleteData = await deleteRes.json();
        assert.equal(deleteRes.status, 200, deleteData.error);
    });    
    
});
