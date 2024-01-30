const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/OrderController');

Router.get('/', orderController.getOrder);
Router.get('/:id', orderController.getOrderById);

Router.post('/neworder', orderController.newOrder);
Router.post('/paymentStatusUpdate', orderController.updatePaymentStatus);

module.exports = Router;