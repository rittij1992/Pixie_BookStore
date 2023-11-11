const express = require('express');
const Router = express.Router();
const bookController = require('../controllers/BookController');
const {auth, adminOnly} = require('../middleware/Auth');
const {bookCoverUpload} = require('../utility/BookCover_upload');

Router.get('/', bookController.getAllBooks);
Router.get('/:id', bookController.getBook);

Router.post('/add', bookCoverUpload.single('coverImage'), bookController.addBook);

Router.put('/update/:id', bookCoverUpload.single('coverImage'), bookController.updateBook);

Router.delete('/delete/:id', bookController.deleteBook);


module.exports = Router;