import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "seller"], default: "user" },
  name: { type: String, required: true },
  cart: { type: Array, default: [] },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);