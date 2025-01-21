import mongoose from "mongoose";
const { Schema } = mongoose;

const AuthSchema = new Schema(
  // passwords must be hashed and salted
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  // Time stamping to help authorites for logging
  {
    timestamps: { createdAt: 'created_At', updatedAt: 'updated_At' }
  }
);

export default mongoose.model("Auth-Collection", AuthSchema);