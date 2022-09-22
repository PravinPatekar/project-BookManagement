const mongoose = require("mongoose")
const bookModel = require('../models/bookModel');
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewModel");

const isValidObjectId = function (objectid) {
    return mongoose.Types.ObjectId.isValid(objectid)
}

const checkvalidReqBody = function (resBody) {
    return Object.keys(resBody).length > 0
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

let isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/

const createBook = async function (req, res) {
    try {
        let bookData = req.body
        if (!checkvalidReqBody(bookData)) {
            return res.status(400).send({ status: false, message: "Invalide Request. Please Provide Book Details" })
        }
    
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = bookData
    
        // ===========================================>> title validation <<==================================================//
    
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "title is required" })
        }
        // if (!validName(title)) return res.status(400).send({ status: false, message: "title Should be Letters" })
    
        let titleunique = await bookModel.findOne({ title })
        if (titleunique) {
            return res.status(400).send({ status: false, message: "title allready exists" })
        }
        // ===============================================>> End <<===========================================================//
    
        // ===============================================>> excerpt validation <<===========================================================//
    
        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }
    
        // ===============================================>> End <<===========================================================//
    
        // ===============================================>> userId validation <<===========================================================//
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }
    
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId" })
        }

        let checkUser = await userModel.findOne({userId})
        if(!checkUser){
            return res.status(400).send({status:false,message:"please enter correct user id becouse user not found for this id"})
        }
    
        // ===============================================>> End <<===========================================================//
    
        // ===============================================>> ISBN validation <<===========================================================//
        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is required" })
        }

        if (!(isbnRegex.test(ISBN))) {
            return res.status(400).send({ status: false, message: "ISBN Should be 10 or 13 digits only" })
        }
    
        let isbnUnique = await bookModel.findOne({ ISBN })
        if (isbnUnique) {
            return res.status(400).send({ status: false, message: "ISBN allready exists" })
        }
    
        // ===============================================>> End <<===========================================================//
    
        // ===============================================>> category validation <<===========================================================//
        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: "category is required" })
        }
        // ===============================================>> End <<===========================================================//
        // ===============================================>> subcategory validation <<===========================================================//
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: "subcategory is required" })
        }
              
        // ===============================================>> End <<===========================================================//
        // ===============================================>> releasedAt validation <<===========================================================//
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "releasedAt is required" })
        }

        // ===============================================>> End <<===========================================================//
    
        let createdBook = await bookModel.create(bookData)
        res.status(201).send({ status: true, message: "Success", data: createdBook })
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
    

}


const getBook = async function (req, res) {
    try {
        let filters = req.query
        let userId = filters.userId
        if (userId) {
            if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "please enter valid user id " })
        }

        let getBooks = await bookModel.find({ isDeleted: false, ...filters }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

        if (getBooks.length == 0) return res.status(404).send({ status: false, message: "Books not found" })

        let sortBook = getBooks.sort((a, b) => a.title.localeCompare(b.title))

    
        return res.status(200).send({ status: false, message: "Book list", data: sortBook })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getBookById = async function (req, res) {
    try {
      let bookId = req.params.bookId;
  
      if (!isValidObjectId(bookId))
        return res
          .status(400)
          .send({ status: false, message: "Book Id invalid" });
  
      let book = await bookModel.findById(bookId);
      if (!book)
        return res
          .status(404)
          .send({
            status: false,
            message: "Book Not Found",
          });

    if (book.isDeleted == true)
      return res.status(400).send({
        status: false,
        message: "Book already Deleted :( ",
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

module.exports = { createBook, getBook, getBookById }