const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");

const isValidObjectId = function (objectid) {
  return mongoose.Types.ObjectId.isValid(objectid);
};

let isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

const updatebook = async function (req, res) {
  try {
    const data = req.body;
    const bookId = req.params.bookId;

    if (!isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid ObjectId" });
    }

    const { title, excerpt, releasedAt, ISBN } = data;

    // ----Validation----------//

    if (!data) {
      return res
        .status(400)
        .send({ status: false, massage: "Please Fill the some data" });
    }
    let book = await bookModel.findById(bookId);
    if (!book) {
      return res
        .status(400)
        .send({ status: false, message: " book is not preasent " });
    }
    //--------update only these property--------//
    if (!(title || excerpt || releasedAt || ISBN)) {
      return res
        .status(400)
        .send({ status: false, massage: "This Property can't be update" });
    }
    if (title) {
      let findTitle = await bookModel.findOne({ title });
      if (findTitle)
        return res.status(400).send({
          status: false,
          massage: "title is already present with another book",
        });
    }

    if (!isbnRegex.test(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "ISBN Should be 10 or 13 digits only",
      });
    }

    let isbnUnique = await bookModel.findOne({ ISBN });
    if (isbnUnique) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN allready exists" });
    }
    //------already deleted---------------//
    if (book.isDeleted === true) {
      return res
        .status(400)
        .send({ status: false, massage: "This Book already deleted" });
    }
    let updatebook = await bookModel.findByIdAndUpdate(
      bookId,
      {
          $set: { title:title, excerpt:excerpt, ISBN:ISBN, releasedAt: new Date }
      }, { new: true })

    return res.status(200).send({ status: true, data: updatebook });
  } catch (err) {
    return res.status(500).send({ status: "error", error: err.message });
  }
};
module.exports.updatebook = updatebook;
