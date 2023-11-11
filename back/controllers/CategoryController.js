const Categories = require('../models/Categories');

exports.getAllCategories = async (req, res) => {
    try {
        const limit = 3;
        const page = parseInt(req.query.page);
        const offset = (page - 1) * limit;
        const catCount = await Categories.countDocuments();
        const totalPages = Math.ceil(catCount / limit);
        const AllCategories = await Categories.find()
        .skip(offset)
        .limit(limit);
        res.status(200).json({
            message: "Categories fetched successfully",
            AllCategories,
            totalPages,
            catCount
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.getCategory = async (req, res) => {
    try {
        const catId = req.params.id;
        const category = await Categories.findById(catId);
        res.status(200).json({
            message: "Categories fetched seccessfully",
            category
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Categories({
            name: name
        });
        const newCategoryData = newCategory.save();
        console.log(req.body);
        res.status(200).json({
            message: "Category added successfully",
            newCategoryData

        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const catId = req.params.id;
        const { name } = req.body;
        const updateCategory = await Categories.findByIdAndUpdate(catId, {
            name
        });
        res.status(200).json({
            message: "Category updated successfully",
            updateCategory
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}



exports.deleteCategory = async (req, res) => {
    try {
        const catId = req.params.id;
        const deleteCategory = await Categories.findByIdAndDelete(catId);
        res.status(200).json({
            message: "Category deleted successfully",
            deleteCategory
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}