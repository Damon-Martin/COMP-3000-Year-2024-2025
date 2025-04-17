import mongoose from 'mongoose';

class UserDetailsController {

    constructor(userDetailModel, basketModel, orderHistoryModel, authModel) {
        this.userDetailModel = userDetailModel;
        // Below is for account deletion
        this.basketModel = basketModel;
        this.orderHistoryModel = orderHistoryModel;
        this.authModel = authModel;
    }

    // Adding User Details done in the Auth Controller
    async getUserDetailsByEmail(email) {
        if (!email) {
            return {
                code: 400,
                error: "Email Attribute is required."
            };
        }

        try {
            // Looking with Mongoose ODM through all items to find a single match of the email
            const user = await this.userDetailModel.findOne({ email });
            if (!user) {
                return {
                    code: 404,
                    error: "User is not found in DB."
                };
            }

            return {
                code: 200,
                user: user
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error: ${e.message}`
            };
        }
    }

    async updateUserDetailsByEmail(email, updateData) {
        if (!email || !updateData || typeof updateData !== 'object') {
            return {
                code: 400,
                error: "Missing email or update data."
            };
        }

        try {
            // Looking with Mongoose ODM through all items to find a single match of the email
            // Then updates with the new data
            const updatedUser = await this.userDetailModel.findOneAndUpdate(
                { email },
                { $set: updateData },
                { new: true }
            );

            if (!updatedUser) {
                return {
                    code: 404,
                    error: `User Details with associated email "${email}" is not found.`
                };
            }

            return {
                code: 200,
                msg: "User Details updated successfully.",
                user: updatedUser
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error: ${e.message}`
            };
        }
    }


    async deleteUserDetailsByEmail(email) {
        if (!email) {
            return {
                code: 400,
                error: "Missing Email to delete account"
            };
        }

        try {
            // Part 1: Delete user's basket
            await this.basketModel.deleteOne({ email });

            // Part 2: Delete user's order history
            await this.orderHistoryModel.deleteMany({ email });

            // Part 3: Delete user's login credentials
            await this.authModel.deleteOne({ email });

            // Finally 6: Delete the user details
            const deletedUser = await this.userDetailModel.findOneAndDelete({ email });

            if (!deletedUser) {
                return {
                    code: 404,
                    error: "User not found."
                };
            }

            return {
                code: 200,
                msg: "User and all associated data deleted successfully.",
                user: deletedUser
            };
        } 
        catch (e) {
            return {
                code: 500,
                error: `Server error: ${e.message}`
            };
        }
    }

    
}

export default UserDetailsController;
