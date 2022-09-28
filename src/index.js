const express = require("express")
const route = require("./routes/route")
const mongoose = require("mongoose")
const app = express()
const multer = require("multer")



app.use(express.json())
app.use(multer().any())


mongoose.connect("mongodb+srv://nirmaljasval:8o1g7W6bqoshvXoN@cluster0.cv9nolo.mongodb.net/group49Databas-DB",{
    useNewUrlParser:true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use("/", route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
