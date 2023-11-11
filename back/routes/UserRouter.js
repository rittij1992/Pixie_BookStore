const express = require('express');
const Router = express.Router();
const userController = require('../controllers/UserController');
const {auth, adminOnly} = require('../middleware/Auth');

Router.post('/register', userController.registerUser);
Router.post('/login', userController.loginUser);
Router.post('/logout', userController.logoutUser);


Router.get('/:id', [auth, adminOnly], userController.getUser);
Router.put('/update', [auth], userController.updateUser);
Router.delete('/delete', [auth, adminOnly], userController.deleteUser);


module.exports = Router;