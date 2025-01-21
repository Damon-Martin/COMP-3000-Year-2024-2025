import mongoose from 'mongoose';

const userDetailSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        fName: { type: String, default: Date.now },
        lName: { type: String, required: true },
        tel: { type: String, required: true },
        address: { type: String, required: true },
        postcode: { type: String, required: true }
    }
);

const UserDetailModel = mongoose.model('Customer-Details', userDetailSchema);

export default UserDetailModel;