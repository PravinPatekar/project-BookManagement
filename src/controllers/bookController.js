const bookModel = require('../models/bookModel');



const getBook = async function (req, res) {
    try {
        let filters = req.query

        let getBooks = await bookModel.find(filters).find({ isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

        if (getBooks.length == 0) return res.status(404).send({ status: false, message: "No such book exist you are serching for!!" })

        getBooks.sort((a, b) => a.title.localeCompare(b.title))



        return res.status(200).send({ status: false, message: "Book list", data: getBooks })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.getBook = getBook