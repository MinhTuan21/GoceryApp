const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1, 
        default: 1 
      }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  isCheckedOut: { 
    type: Boolean, 
    default: false 
  },
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order", 
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
