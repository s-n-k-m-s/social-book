const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blogSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
}, {timestamps: true})

const Blog = new mongoose.model('Blog', blogSchema)
module.exports = Blog