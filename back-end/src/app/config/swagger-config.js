import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Back-End Server",
            version: "1.0.0",
            description: "Responsible for showing Items, Categories and Payments with PayPal based on customer order",
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
        ],
    },
    apis: ["./src/app/routes/*.js"],
};

const specs = swaggerJsDoc(options);
export { specs, swaggerUI };