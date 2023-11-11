const express = require('express');
const Router = express.Router();
const categoryRouter = require('../controllers/CategoryController');
const {auth, adminOnly} = require('../middleware/Auth');


Router.get('/', categoryRouter.getAllCategories);
Router.get('/:id', categoryRouter.getCategory);

Router.post('/add', categoryRouter.addCategory);

Router.put('/update/:id', categoryRouter.updateCategory);

Router.delete('/delete/:id', categoryRouter.deleteCategory);



module.exports = Router;