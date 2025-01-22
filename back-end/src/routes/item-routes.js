/* This is responsible for displaying, updating, editing, items */
import express from "express";

const ItemRouter = express.Router();

ItemRouter.get('/', (req, res) => {
    res.send('Hello World!')
})

export default ItemRouter;