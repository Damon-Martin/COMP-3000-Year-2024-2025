import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        token: { type: String, required: true, unique: true },
        issuedAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
        isRevoked: { type: Boolean, default: false } // Flag to auto revoke the token
    }
);

const SessionModel = mongoose.model('Session', sessionSchema);

export default SessionModel;