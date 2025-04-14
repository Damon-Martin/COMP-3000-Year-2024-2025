import mongoose from 'mongoose';

class BasketController {
    constructor(basketModel) {
        this.basketModel = basketModel;
        this.AuthURI = String(process.env.AUTH_URI_FOR_BACKEND_ONLY);
    }

    async getBasket(token) {
        const response = await this.getUsernameFromToken(token);
    
        if (response.code !== 200) {
            return { code: response.code, error: response.error };
        }
        
        const email = response.email;

        try {
            const basket = await this.basketModel.findOne({ email: email });

            // The user does not have any items in their basket and is new
            if (!basket) {
                return {
                    code: 200,
                    basket: []
                }
            }

            // User has a basket or has prev had a basket
            return {
                code: 200,
                basket: basket.items
            }
        }
        catch (e) {
            return {
                code: 500,
                error: `Mongoose failed to retrieve the user basket, ${e}`
            }
        }
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


    // Only deletes 1 item with the ID
    async deleteItemFromBasket(id , token) {
        const response = await this.getUsernameFromToken(token);
    
        if (response.code !== 200) {
            return { code: response.code, error: response.error };
        }
        
        const email = response.email;

        try {
            const basket = await this.basketModel.findOne({ email: email });

            // The user does not have any items in their basket so deletion is fine
            // Done nothing but is a valid move
            if (!basket) {
                return {
                    code: 200,
                    basket: []
                }
            }

            // Removing the item if it has a matching ID
            // Find the index of the first item with a matching ID
            const itemIndex = basket.items.findIndex(item => item.id.toString() === id);

            // If the item is not found, return the basket as is
            if (itemIndex === -1) {
                return {
                    code: 200,
                    basket: basket.items
                };
            }

            // Removing the item at the found index
            basket.items.splice(itemIndex, 1);

            // Saving the updated DB
            await basket.save();

            return {
                code: 200,
                basket: basket.items
            };
        }
        catch (e) {
            return {
                code: 500,
                error: `Mongoose failed to retrieve the user basket, ${e}`
            }
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