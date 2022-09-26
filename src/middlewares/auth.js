const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const mongoose = require("mongoose")

const isValidObjectId = function (objectid) {
    return mongoose.Types.ObjectId.isValid(objectid)
}
const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "Please Provide Token in Header" })
        }
        let decodedToken = jwt.verify(token, "Project 3 Bookmanagement Group-49")

        if (!decodedToken) return res.status(401).send({ status: false, msg: "token is not valid" })
        let userId = decodedToken.userId
        req["tokenUserId"] = userId
        next()
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: " server Error", error: err.message })
    }
}



const authorisation = async function (req, res, next) {
    try {
        let tokenUserId = req.tokenUserId
        let bookId = req.params.bookId

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book Id" })
        }

        let findBook = await bookModel.findById(bookId);
        if (!findBook)return res.status(404).send({status: false,message: "Book Not Found"});
        if (findBook.isDeleted == true)return res.status(400).send({status: false,message: "Book already Deleted :( "});
        
        let user = findBook.userId
        if (tokenUserId == user) {
            next();
        } else {
            return res.status(403).send({ status: false, msg: "Sorry You are not authorised" })
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


module.exports = { authentication, authorisation }