const bookModel = require('../models/bookModel');
const mongoose = require("mongoose")

const isValidObjectId = function (objectid) {
    return mongoose.Types.ObjectId.isValid(objectid)
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

module.exports.getBook = getBook