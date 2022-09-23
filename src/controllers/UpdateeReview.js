const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

const isValidObjectId = function (objectid) {
    return mongoose.Types.ObjectId.isValid(objectid)
}

const checkvalidReqBody = function (resBody) {
    return Object.keys(resBody).length > 0
}

module.exports = {upadateReview}