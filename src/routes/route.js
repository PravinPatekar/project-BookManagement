const express = require("express")
const router = express.Router()
const userController= require("../controllers/userController")
const createBook = require("../controllers/userController")





//========== post api users===========================
router.post("/register", userController.registerUser)

//============login api================
router.post("/login", userController.login)

// =============== Create Book api ==================

router.post("/books", createBook.createBook )
 
//=========================== if the endpoint are correct or not ==========================================
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The Path you are requesting is not available !!"
    })
})

module.exports = router