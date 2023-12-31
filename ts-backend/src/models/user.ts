import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    username: {
      type: String,
    },
    password: { type: String },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plasticProducts",
      },
    ],
    wishlistedProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plasticProducts",
      },
    ],
  });

const User = mongoose.model("users",userSchema)
export default User