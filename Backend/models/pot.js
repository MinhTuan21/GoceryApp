const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  size: { type: String }, 
  material: { type: String }, 
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Pot', potSchema);
