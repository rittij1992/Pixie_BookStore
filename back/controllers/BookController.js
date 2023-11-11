const Books = require('../models/Books');

exports.getAllBooks = async (req, res) => {
    try {
        const limit = 6;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const bookCount = await Books.countDocuments();
        const totalPage = Math.ceil(bookCount / limit);
        const AllBooks = await Books.find()
        .populate({path: 'category', select: 'name'})
        .skip(offset)
        .limit(limit);
        res.status(200).json({
            message: "Books fetched successfully",
            AllBooks,
            bookCount,
            totalPage
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.getBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const Book = await Books.findById(bookId);
        res.status(200).json({
            message: "Book fetched successfully",
            Book
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.addBook = async (req, res) => {

    try {
        const { name, price, author, release, description, available_qty, category, feature, order } = req.body;

        let coverImage = "";
        let fileBrowse = req.file;
        if (fileBrowse) {
            coverImage = req.file.path;

        }
        const newBook = new Books({
            name,
            price,
            coverImage,
            author,
            release,
            description,
            available_qty,
            category,
            feature,
            order
        });
        const newBookData = await newBook.save();
        res.status(200).json({
            message: "Book added successfully",
            newBookData
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { name, price, author, release, description, available_qty, category, feature, order } = req.body;
        
        let fileBrowse = req.file;
        let coverImage = "";
        let updateBook;

        if (fileBrowse) {
            coverImage = req.file.path;
            updateBook = await Books.findByIdAndUpdate(bookId,
                {
                    name,
                    price,
                    coverImage,
                    author,
                    release,
                    description,
                    available_qty,
                    category,
                    feature,
                    order
                });
        } else {
            updateBook = await Books.findByIdAndUpdate(bookId,
                {
                    name,
                    price,
                    author,
                    release,
                    description,
                    available_qty,
                    category,
                    feature,
                    order
                });

        };

        res.status(200).json({
            message: "Book updated successfully",
            updateBook
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deleteBook = await Books.findByIdAndDelete(bookId);
        res.status(200).json({
            message: "Book deleted successfully",
            deleteBook
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}