const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose")

// function isValidObjectId(value){
//   return mongoose.Types.ObjectId.isValid(value)
// }

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
  };
  
const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Book Id invalid" });

    let book = await bookModel.findOne({isDeleted:false,bookId});
    if (!book)
      return res
        .status(404)
        .send({
          status: false,
          message: "Book Not Found",
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
        message: "success",
        data: book,
      });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getBookById = getBookById;
