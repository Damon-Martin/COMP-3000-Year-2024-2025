import mongoose from 'mongoose';

const ordersHistorySchema = new mongoose.Schema(
    {
        transactionID: { type: String, required: false },
        totalAmount: { type: mongoose.Schema.Types.Mixed, required: false },
        isRefunded: { type: Boolean, default: false },
        email: { type: String, required: false },
        payerEmail: { type: String, required: false },
        items: { type: Array, required: false }
    }
);

const OrderHistoryModel = mongoose.model('order-histories', ordersHistorySchema);

export default OrderHistoryModel;