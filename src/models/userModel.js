const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true,"Title must be present"],
      enum: ["Mr", "Mrs", "Miss"],
    },

    name: {
      type: String,
      required: [true,"Please provide a name"],
      trim: true,
    },

    phone: {
      type: Number,
      trim: true,
      required: [true,"Please provide phone number"],
      unique: true,
    },

    email: {
      type: String,
      required:[ true,"Please provide email id"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required:[true,"Please provide password"],
      trim: true,
    },

    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
