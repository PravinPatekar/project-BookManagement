const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const validator = require("validator");




const deletedReview = async function (req, res) {
    try {
      let bookId = req.params.bookId;
      let reviewId = req.params.reviewId;
      //----------------------Validation Start--------------------------------------------------------//
  
      if (!(isValid(bookId) && validator.isValidObjectId(bookId))) {
        return res.status(400).send({
          status: false,
          message: "bookId is not present or Invalid bookId",
        });
      }
  
      if (!(isValid(reviewId) && validator.isValidObjectId(reviewId))) {
        return res.status(400).send({
          status: false,
          message: "reviewId is not present or Invalid reviewId",
        });
      }
      //----------------------Validation Ends--------------------------------------------------------//
  
      let isReviewIdPresent = await reviewModel.findOne({
        _id: reviewId,
        isDeleted: false,
      });
  
      if (isReviewIdPresent == null) {
        return res.status(404).send({
          status: false,
          msg: "No review is present",
        });
      }
  
      const isBookIdPresent = await bookModel.findOneAndUpdate(
        {
          _id: bookId,
          isDeleted: false,
        },
        {
          $inc: {
            reviews: -1,
          },
        }
      );
  
      if (isBookIdPresent == null) {
        return res.status(404).send({
          status: false,
          msg: "No book is found",
        });
      }
  
      const date = new Date();
  
      await reviewModel.findByIdAndUpdate(
        reviewId,
        {
          isDeleted: true,
          deletedAt: date,
        },
        {
          new: true,
        }
      );
  
      return res.status(200).send({
        status: true,
        message: "Success",
      });
    } catch (err) {
      return res.status(500).send({
        msg: err.message,
      });
    }
  };

  module.exports.deletedReview = deletedReview;