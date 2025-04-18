const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // đường dẫn ảnh
  description: { type: String },
  type: { type: String }, // ví dụ: "watering", "tools", v.v.
}, { timestamps: true });

module.exports = mongoose.model('Accessory', accessorySchema);
