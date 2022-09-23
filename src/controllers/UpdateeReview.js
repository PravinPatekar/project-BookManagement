const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

const isValidObjectId = function (objectid) {
    return mongoose.Types.ObjectId.isValid(objectid)
}

const checkvalidReqBody = function (resBody) {
    return Object.keys(resBody).length > 0
}
const upadateReview = async function(req,res){
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book Id" })
        }

        let bookData = await bookModel.findById(bookId)
        if (!bookData)return res.status(404).send({status: false,message: "Book Not Found",});
        if (bookData.isDeleted == true) return res.status(400).send({status: false,message: "Book already Deleted :( "});

        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, message: "Invalid review Id" })
        }
        let reviewData = await reviewModel.findById(reviewId)
        if (!reviewData)return res.status(404).send({status: false,message: "Review Not Found",});
        if (bookData.isDeleted == true) return res.status(400).send({status: false,message: "Review already Deleted :( "});

        let upadateData = req.body
        if (!checkvalidReqBody(upadateData)) {
            return res.status(400).send({ status: false, message: "Invalide Request. Please Provide Review Details" })
        }

        let {review, rating, reviewedBy } = upadateData

        if(typeof(rating)!=="Number" || rating < 1 || rating > 5){
            return
        }

    //    let ratingregex = /[+]?([0-4]*\[0-9]+|[1-5])/
    //    if (!(ratingregex.test(rating))) {
    //     return res.status(400).send({ status: false, message: "Rating Should be 1 to 5 digit only or no decimal" })
    // }
        let upadate = await reviewModel.findByIdAndUpdate(
            reviewId,
            {$set:{review:review,rating:rating,reviewedBy:reviewedBy,reviewedAt: Date.now()}},
            {new:true} 
        )

        res.status(200).send({status:true,message:"success",data:upadate})
        
    } catch (error) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {upadateReview}