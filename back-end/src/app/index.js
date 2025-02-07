import express from 'express';
import mongoose from 'mongoose';
import ItemRouter from './routes/item-routes.js';
import AuthMiddleware from './middleware/auth-middleware.js';

import { specs, swaggerUI } from './config/swagger-config.js';

const app = express()
const isProduction = process.env.PRODUCTION === 'true'; // Using Logic to determine if true or false based on env string
const port = 3000
const connectionStr = String(process.env.DBConnectionStr);

// Display swagger if in development
if (!isProduction) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

// Mongoose Settings
let retryCount = 0;
const maxRetries = 10;

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

      // Middlewares
      app.use(AuthMiddleware.restrictEndpointWithoutDB);
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use("/v1/items", ItemRouter);

      app.listen(port, () => {
        console.log(`Example app listening on port ${port} & Production is ${isProduction}`)
      })
  }
  // Closes the application
  catch (error) {
      console.error("Error during app initialization:", error);
      process.exit(1);
  }
}
main();