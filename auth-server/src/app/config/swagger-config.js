import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Server",
            version: "1.0.0",
            description: "Auth Server that gives clients JWT and this also validates JWT directly with the backend from the client tokens given to the backend.",
        },
        servers: [
            {
                url: "http://localhost:4000/",
            },
        ],
    },
    apis: ["./src/app/routes/*.js"],
};

const specs = swaggerJsDoc(options);
export { specs, swaggerUI };