const express = require("express")
const router = express.Router()
const userController= require("../controllers/userController")
<<<<<<< HEAD
const bookControllers =require("../controllers/bookController")

=======
const getBookById = require("../controllers/getBookByid")
>>>>>>> 0995a8804666871dfcc6483661306cc2a2fb1ad2





//========== post api users===========================
router.post("/register", userController.registerUser)

//============login api================
router.post("/login", userController.login)

<<<<<<< HEAD
// =================getbook api=============//
router.get("/books",bookControllers.getBook)
 
=======

//=================getBookById==============
router.get("/books/:bookId", getBookById.getBookById)

>>>>>>> 0995a8804666871dfcc6483661306cc2a2fb1ad2
//=========================== if the endpoint are correct or not ==========================================
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The Path you are requesting is not available !!"
    })
})

module.exports = router;