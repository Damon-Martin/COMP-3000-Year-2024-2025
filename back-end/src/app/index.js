import express from 'express'
import ItemRouter from '../routes/item-routes.js'

const app = express()
const port = 3000

app.use("/v1", ItemRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})