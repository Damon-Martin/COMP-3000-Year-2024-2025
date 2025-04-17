
import mongoose from 'mongoose';

class OrderHistoryController {
    constructor(OrderHistoryModel) {
        this.OrderHistoryModel = OrderHistoryModel;
        this.AuthURI = String(process.env.AUTH_URI_FOR_BACKEND_ONLY);
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

    // Returns all orders for a given user email
    // This is used internally to fetch user order history
    async getOrdersByToken(token) {
        try {

            const rawRes = await fetch(`${this.AuthURI}/v1/validateJWT`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const data = await rawRes.json();

            if (rawRes.status == 200) {
                try {
                    const orders = await this.OrderHistoryModel.find({ email: data.email });
                    return { code: 200, orderHistory: orders };
                }
                catch (e)
                {
                    return { code: 500, error: e };
                }
            }
            else if (rawRes) {
                return { code: 401, error: "Token Invalid: Most Likely expired" };
            }
            else {
                return { code: 500, error: "Failed to login completely" };
            }
        } 
        catch (e) {
            return { code: 500, error: "Failed to fetch order history from db" };
        }
    }



    async setRefundOnTransaction(transactionID, accessToken) {
        
    }

    // Adds an order to the DB during refund (GDPR Compliance)
    removeAllOrderHistory(emailUsername) {}
}

export default OrderHistoryController;