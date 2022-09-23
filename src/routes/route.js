const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const bookControllers = require("../controllers/bookController")
<<<<<<< HEAD
const upadateReview = require("../controllers/UpdateeReview")
=======
const reviewController = require("../controllers/reviewController")
>>>>>>> 9bad9740d31d840dbd40e840bc320bcf617d734e



const { authentication, authorisation } = require("../middlewares/auth")



//========== post api users===========================
router.post("/register", userController.registerUser)

//============login api================
router.post("/login", userController.login)


// =============== Create Book api ==================

router.post("/books", authentication, bookControllers.createBook)

// =================getbook api=============//
router.get("/books", authentication, bookControllers.getBook)

//=================getBookById==============
router.get("/books/:bookId", authentication, bookControllers.getBookById)

// ==================Update Api+===============?
router.put("/books/:bookId", authentication, authorisation, bookControllers.updatebook)

// ===================delete api======================//
router.delete("/books/:bookId",authentication, authorisation, bookControllers.deleteById)

<<<<<<< HEAD

router.put("/books/:bookId/review/:reviewId" , upadateReview.upadateReview )
=======
//===================review api====================//

router.post("/books/:bookId/review", reviewController.review);
>>>>>>> 9bad9740d31d840dbd40e840bc320bcf617d734e

//=========================== if the endpoint are correct or not ==========================================
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Invalid Url"
    })
})

module.exports = router;