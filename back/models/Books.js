const mongoose = require('mongoose');
const Categories = require('./Categories');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available_qty: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Categories,
        required: true
    },
    feature: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("Books", bookSchema);