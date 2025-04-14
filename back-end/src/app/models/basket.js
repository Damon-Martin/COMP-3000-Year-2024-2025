import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        items: { type: Array, required: true },
    }
);

const BasketModel = mongoose.model('Basket', basketSchema);

export default BasketModel;