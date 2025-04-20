import { assert } from 'chai';

const AuthURI = "http://localhost:81";

describe("Unit Tests: Auth Routes", () => {
    let testUserToken = "";
    let testAdminToken = "";

    it("Registering new customer and the res should say admin false, expect 200", async () => {
        const randomSuffix = Math.floor(Math.random() * 100000);
        const newUser = {
            email: `testuser${randomSuffix}@example.com`,
            password: "TestPassword123!",
            userDetails: {
                fName: "John",
                lName: "Doe",
                tel: "123456789",
                address: "123 Test Street",
                postcode: "TE57 1NG"
            }
        };

        const res = await fetch(`${AuthURI}/v1/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        const data = await res.json();
        testUserToken = data.token;

        assert.equal(res.status, 200, data.error);
        assert.exists(data.token);
        assert.isFalse(data.admin);
    });

    it("Logging in as seeded admin and the res should show admin is true, expect 200", async () => {
        const loginDetails = {
            email: "admin@example.com",
            password: "password"
        };

        const res = await fetch(`${AuthURI}/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails)
        });

        const data = await res.json();
        testAdminToken = data.token;

        // Assert: Admin login successful and the response shows they are an admin
        assert.equal(res.status, 200, data.error);
        assert.isTrue(data.admin);
        assert.exists(data.token);
    });

    it("Should return 404 if logging in to an email which does not exist", async () => {
        // Arrange
        const loginDetails = { email: "wrong@example.com", password: "badpass" }

        // Act: Trying to login to an account which does not exist
        const res = await fetch(`${AuthURI}/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails)
        });

        // Asserting: The system knows the user does not exist
        assert.equal(res.status, 404);
    });

    it("Registering new admin with valid object and is new, expect 200", async () => {
        // Arrange: New admin details to register
        const randomSuffix = Math.floor(Math.random() * 100000); // Ensuring randomness
        const newAdmin = {
            email: `admin${randomSuffix}@example.com`,
            password: "SecurePassword!123",
            adminDetails: {
                fName: "Alice",
                lName: "Smith",
                tel: "987654321",
                NiNumber: "QQ123456C",
                address: "456 Admin Road",
                postcode: "AD45 1MN"
            }
        };

        // Act: Performing POST REQ
        const res = await fetch(`${AuthURI}/v1/registerAdmin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdmin)
        });

        const data = await res.json();

        // Asserting: Creation is successful
        assert.equal(res.status, 200, data.error);
        assert.isTrue(data.admin);
        assert.exists(data.token);
    });

    it("Checking JWT checker with valid token, expect 200", async () => {
        const res = await fetch(`${AuthURI}/v1/validateJWT`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: testUserToken })
        });

        const data = await res.json();
        assert.equal(res.status, 200, data.error);
        assert.exists(data.email);
    });

    it("Checking JWT checker with INVALID token,, expect 401", async () => {
        const res = await fetch(`${AuthURI}/v1/validateJWT`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: "invalid.token.value" })
        });

        const data = await res.json();
        assert.equal(res.status, 401);
        assert.exists(data.error);
    });
});
