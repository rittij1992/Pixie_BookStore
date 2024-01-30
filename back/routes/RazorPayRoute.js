const express = require('express');
const Router = express.Router();
const RazorPay = require('../controllers/RazorPayController');

Router.post("/orders", RazorPay.order);
Router.post("/verify", RazorPay.verify);

module.exports = Router;