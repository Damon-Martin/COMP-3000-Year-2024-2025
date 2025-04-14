import { assert } from 'chai';

const BackendURI = "http://localhost:82";
const AuthURI = "http://localhost:81";


describe(("Integration Test: Backend"), async () => {

    // This uses a token and saves an item to the basket of the user
    // Testing the interaction not functionality between micro-services
    it("Back Interacts with Auth Server with valid token and saves to db", async () => {

        /********************* Arrange  ****************************/
        const reqBody = {
            "email": generateRandomEmail(),
            "password": "password",
            "userDetails": {
              "fName": "Jack",
              "lName": "Smith",
              "tel": generateRandomPhoneNumber(),
              "address": "123 Example Street",
              "postcode": "PL1 2XR"
            }
        };

        const backendReqBody = {
            newItem: {
                id: '67faa58d12f175d8d6240188',
                name: 'Grey Hoodie',
                price: 19.99,
                description: 'A trendy hoodie suitable for teens and adults',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Man_Hoodie_Salamanca_%28Unsplash%29.jpg',
                altImgTxt: 'Image of a Grey Hoodie'
            },
            clientItems: [
                {
                    id: '67faa58d12f175d8d6240123',
                    name: 'Red Hoodie',
                    price: 24.99,
                    description: 'A bold red hoodie',
                    imageUrl: 'https://example.com/red-hoodie.jpg',
                    altImgTxt: 'Image of a Red Hoodie'
                },
                {
                    id: '67faa58d12f175d8d6240456',
                    name: 'Blue Hoodie',
                    price: 21.50,
                    description: 'A stylish blue hoodie',
                    imageUrl: 'https://example.com/blue-hoodie.jpg',
                    altImgTxt: 'Image of a Blue Hoodie'
                }
            ]
        };

        /********************* Act  ****************************/

        const authRawRes = await fetch(`${AuthURI}/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        if (authRawRes.status != 200) {
            assert.fail("Failed Registering Account")
        }

        const data = await authRawRes.json();
        const token = data.token;

        const backendRawRes = await fetch(`${BackendURI}/v1/basket/add-items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(backendReqBody)
        })

        const status = backendRawRes.status;
        const backendData = await backendRawRes.json();

        /********************* Assert  ****************************/
        assert.equal(status, 200, `${backendData.error}`);
    })
});

describe(("Integration Test: Auth Server"), async () => {

    // This uses a token and saves an item to the basket of the user
    // Testing the interaction not functionality between micro-services
    it("Testing Auth Server saves to to db by checking login works after reg", async () => {

        const email = generateRandomEmail();
        const pass = generateRandomEmail();

        /********************* Arrange  ****************************/
        const reqBody = {
            "email": email,
            "password": pass,
            "userDetails": {
              "fName": "Jack",
              "lName": "Smith",
              "tel": generateRandomPhoneNumber(),
              "address": "123 Example Street",
              "postcode": "PL1 2XR"
            }
        };


        /********************* Act  ****************************/

        const authRawRes = await fetch(`${AuthURI}/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        if (authRawRes.status != 200) {
            assert.fail("Registration failed")
        }

        const loginRawRes = await fetch(`${AuthURI}/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        const loginResData = await loginRawRes.json();
        const errorMsg = loginResData.error;

        /********************* Assert  ****************************/
        assert.equal(loginRawRes.status, 200, errorMsg);

    })
});


const generateRandomEmail = () => {
    return `${Math.random().toString(36).substring(2, 15)}@example.com`;
};

const generateRandomPhoneNumber = () => {
    return `0747${Math.floor(Math.random() * 10000000000).toString().padStart(8, '0')}`;
};