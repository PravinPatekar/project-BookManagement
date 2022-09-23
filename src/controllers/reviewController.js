const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const review = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid book id" });

    let checkBookId = await bookModel.findById(bookId);
    if (!checkBookId)
      return res.status(404).send({ status: false, message: "Book not found" });

    if (checkBookId.isDeleted == true)
      return res
        .status(404)
        .send({
          status: false,
          message: "Book not found or might have been deleted",
        });

    let data = req.body;

    if (!Object.keys(data).length > 0)
      return res
        .status(400)
        .send({
          status: false,
          message: "Details required to add review to book",
        });

    if (!data.rating)
      return res
        .status(400)
        .send({
          status: false,
          message: "Rating is required and should not be 0",
        });
    if (!/^[1-5]$/.test(data.rating)) {
      return res
        .status(400)
        .send({ status: false, message: "Rate between 1-5" });
    }

    data.bookId = bookId;

    let reviewData = await reviewModel.create(data);
    await bookModel.updateOne({ _id: bookId }, { $inc: { reviews: 1 } });

    res
      .status(201)
      .send({ status: true, message: "Success", data: reviewData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.review = review;
