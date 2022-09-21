const express = require("express")
const router = express.Router()
const userController= require("../controllers/userController")
const getBookById = require("../controllers/getBookByid")





//========== post api users===========================
router.post("/register", userController.registerUser)

//============login api================
router.post("/login", userController.login)


//=================getBookById==============
router.get("/books/:bookId", getBookById.getBookById)

//=========================== if the endpoint are correct or not ==========================================
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The Path you are requesting is not available !!"
    })
})

module.exports = router;