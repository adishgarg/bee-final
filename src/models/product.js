import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  category: { type: String, enum: ["male", "female"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);