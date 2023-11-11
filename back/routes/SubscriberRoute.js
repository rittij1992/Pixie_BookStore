const express = require('express');
const Router = express.Router();
const subscriberRouter = require('../controllers/SubscriptionController');

Router.get('/allContactMessage', subscriberRouter.getContactUsDetail);

Router.post('/sent', subscriberRouter.subscribe);
Router.post('/newContactMessage', subscriberRouter.contact);

module.exports = Router;