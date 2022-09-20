const mongoose = require('mongoose');
const ObjectId = mongoose.type.ObjectId;

const bookSchema = new mongoose.Schema(
    { 
        title: {
            type:String,
            required:true,
            unique: true},
        excerpt: {
            type:String, 
            required:true
        }, 
        userId: {
            type:ObjectId,
            required:true,
            ref: "User"
        },
        ISBN: {
            type:String, 
            required:true,
            unique:true
        },
        category: {type:String, 
            required:true
        },
        subcategory: [{ 
            type:String, 
            required:true
        }],
        reviews: {
            type:number, 
            default: 0, 
            comment: String
        },
        deletedAt: {Date}, 
        isDeleted: {
            type:Boolean, 
            default: false
        },
        releasedAt: {
            Date, 
            required:true, 
            format:("YYYY-MM-DD")
        },
      },{timestamps:true});

      module.exports = mongoose.model("Book",bookSchema)
