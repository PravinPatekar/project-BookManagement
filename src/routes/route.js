const express = require("express")
const router = express.Router()
const userController= require("../controllers/userController")
const bookControllers =require("../controllers/bookController")



//========== post api users===========================
router.post("/register", userController.registerUser)

//============login api================
router.post("/login", userController.login)


// =============== Create Book api ==================

router.post("/books", bookControllers.createBook )

// =================getbook api=============//
router.get("/books",bookControllers.getBook)

//=================getBookById==============
router.get("/books/:bookId", bookControllers.getBookById)

//=========================== if the endpoint are correct or not ==========================================
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Invalid Url"
    })
})

module.exports = router;