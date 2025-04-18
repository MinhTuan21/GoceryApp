const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["plant", "pot", "accessory", "combo"] 
  },
  description: { type: String },
  stock: { type: Number, required: true },
  image: { type: String },
  tags: [String], // ví dụ: ["ưa sáng", "ưa bóng"]
  isNew: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
