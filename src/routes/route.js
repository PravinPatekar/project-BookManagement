const express = require("express")
const router = express.Router()


 

router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The Path you are requesting is not available !!"
    })
})

module.exports = router