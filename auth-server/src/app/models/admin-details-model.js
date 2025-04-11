import mongoose from 'mongoose';

const adminDetailSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        fName: { type: String, required: true },
        lName: { type: String, required: true },
        NiNumber: { type: String, required: true },
        tel: { type: String, required: true },
        address: { type: String, required: true },
        postcode: { type: String, required: true }
    }
);

const AdminDetailModel = mongoose.model('Admin-Details', adminDetailSchema);

export default AdminDetailModel;