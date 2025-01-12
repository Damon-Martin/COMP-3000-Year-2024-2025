import express from 'express'
import AuthRouter from './routes/auth-routes.js';

const app = express();
const port = 3000

app.use("/v1", AuthRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})