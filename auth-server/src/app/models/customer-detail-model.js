import mongoose from 'mongoose';

const userDetailSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        fName: { type: String, required: true },
        lName: { type: String, required: true },
        tel: { type: String, required: true },
        address: { type: String, required: true },
        postcode: { type: String, required: true }
    }
);

const UserDetailModel = mongoose.model('Customer-Details', userDetailSchema);

export default UserDetailModel;