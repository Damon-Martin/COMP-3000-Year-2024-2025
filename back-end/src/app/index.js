import express from 'express'
import ItemRouter from './routes/item-routes.js'

import { specs, swaggerUI } from './config/swagger-config.js';

const app = express()
const isProduction = process.env.PRODUCTION === 'true'; // Using Logic to determine if true or false based on env string
const port = 3000

// Display swagger if in development
if (!isProduction) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

app.use("/v1", ItemRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} & Production is ${isProduction}`)
})