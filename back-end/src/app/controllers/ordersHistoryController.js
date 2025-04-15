
import mongoose from 'mongoose';

class OrderHistoryController {
    constructor(OrderHistoryModel) {
        this.OrderHistoryModel = OrderHistoryModel;
    }

    // Adds an order to the DB
    // I will keep refunded orders in db for auditing reasons
    // This is used only in the backend and not as a route for public to use
    async addOrderDetailsDB(transactionID, totalAmount, emailUsername, payerEmail, items) {
        try {
            // Add a refund attribute and set to false
            const newOrderHistory = new this.OrderHistoryModel({
                transactionID: transactionID,
                totalAmount: totalAmount,
                email: emailUsername,
                payerEmail: payerEmail,
                items: items
            });

            await newOrderHistory.save();
            return { code: 200 }
        }
        catch(e) {
            return { code: 500, error: "Failed to save order history to db" }
        }
    }


    async setRefundOnTransaction(transactionID, accessToken) {
        
    }

    // Adds an order to the DB during refund (GDPR Compliance)
    removeAllOrderHistory(emailUsername) {}
}

export default OrderHistoryController;