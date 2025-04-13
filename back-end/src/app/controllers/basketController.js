import mongoose from 'mongoose';

class BasketController {
    constructor(basketModel) {
        this.basketModel = basketModel;
        this.AuthURI = String(process.env.AUTH_URI_FOR_BACKEND_ONLY);
    }

    async addItems(token, newItem, clientItems) {
        const response = await this.getUsernameFromToken(token);
    
        if (response.code !== 200) {
            return { code: response.code, error: response.error };
        }
        

        if (!newItem) {
            return { code: 400, error: "New Item is required to add an Item" };
        }

        const email = response.email;
        
        // Merging Items to add to the basket
        const itemsToAdd = [ ...(clientItems || []), newItem ];

        try {
            const basket = await this.basketModel.findOne({ email: email });
            
            // User does not have a basket
            if (!basket) {
                try {
                    const newBasket = new this.basketModel({
                        email: email,
                        items: itemsToAdd
                    })

                    await newBasket.save()

                    return { code: 200, msg: "Items successfully added to a new basket" };
                }
                catch {
                    return { code: 500, msg: "Failure adding items to a new basket during DB Saving" };
                }
            }
            // User already has a basket
            else {
                // Appending items to the exisiting list
                await basket.items.push(...itemsToAdd);
        
                // Saving the updated basket
                await basket.save();
        
                return { code: 200, msg: "Items successfully added to existing basket" };
            }

        } 
        catch (e) {
            console.error("Error updating basket:", e);
            return { code: 500, error: "Internal server error: Failed to update basket" };
        }
    }    

    async getUsernameFromToken(token) {
        if (!token) {
            return { code: 400, error: "No token provided. Token is needed to auth and contains the username" };
        }

        // Removing Bearer prefix which is industry standard
        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
        }

        try {
            // Contacting Auth Server and validating with the service
            const rawRes = await fetch(`${this.AuthURI}/v1/validateJWT`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token })
            });

            // User is authenticated: Sending Email
            if (rawRes.status == 200) {
                const data = await rawRes.json();
                return { code: 200, email: data.email }
            }
            // User Token is Invalid
            else {
                return { code: 401, error: "Invalid Token: Unauthorized Access"}
            }
        }
        catch {
            return { code: 500, error: "Failed to check token with Auth Server for adding item to basket" };
        }
    }
}

export default BasketController;