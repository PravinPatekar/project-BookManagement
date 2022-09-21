const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose")

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
  };
  


const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Ohh! dear you entred wrong details." });

    let book = await bookModel.findById(bookId);
    if (!book)
      return res
        .status(404)
        .send({
          status: false,
          message: "Oops! we don't have the book you are looking for.",
        });

    if (book.isDeleted == true)
      return res.status(404).send({
        status: false,
        message: "sorry! we don't have any book with this details.",
      });

    let reviewData = await reviewModel.find({ bookId: book._id });
    if (book.reviews == 0) {
      Object.assign(book._doc, { reviewData: [] });
    } else {
      Object.assign(book._doc, { reviewData: [reviewData] });
    }

    res
      .status(200)
      .send({
        status: true,
        count: reviewData.length,
        message: "Hurray! we found the book you're looking for.",
        data: book,
      });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getBookById = getBookById;
