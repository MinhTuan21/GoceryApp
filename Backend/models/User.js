const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    otp: { type: String }, 
    otpExpire: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.isOtpValid = function() {
    return this.otpExpire > Date.now();
}

module.exports = mongoose.model("User", userSchema);
