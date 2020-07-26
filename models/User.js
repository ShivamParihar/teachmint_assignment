const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Student", "Teacher"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
