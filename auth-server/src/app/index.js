import express from 'express';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth-routes.js';

const app = express();
const port = 3000;
const connectionStr = "mongodb://root:example@db:27017/database?authSource=admin";

// Mongoose Settings
let retryCount = 0;
const maxRetries = 10;

// Global Middlewares
app.use(express.json());

// Retries connection until max retries reached until connection is established
async function initMongo() {
    try {
        await mongoose.connect(connectionStr);
        console.log("Connected to MongoDB successfully");
    } 
    catch (error) {
        retryCount++;
        console.log(`Connection failed: retry ${retryCount} in 50ms`, error);

        if (retryCount <= maxRetries) {
            setTimeout(initMongo, 50);
        } 
        else {
            console.error("Max retries reached. Could not connect to MongoDB.");
            process.exit(1);
        }
    }
}

async function main() {
    try {
        await initMongo(); // Recursively attempts a connection

        app.use("/v1", AuthRouter);

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
    // Closes the application
    catch (error) {
        console.error("Error during app initialization:", error);
        process.exit(1);
    }
}

// Call the main function
main();
