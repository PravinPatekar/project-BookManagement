const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: { type: String, required: true },
    subcategory: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: {
      type: Number,
      default: 0,
      comment: String,
    },
    deletedAt: { type:Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    releasedAt: {
<<<<<<< HEAD
      type:Date,
=======
      type: Date,
>>>>>>> 0995a8804666871dfcc6483661306cc2a2fb1ad2
      required: true,
      format: "YYYY-MM-DD",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
