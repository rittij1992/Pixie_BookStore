const express = require('express');
const Router = express.Router();
const StripePayment = require("../controllers/StripePayment");

Router.post('/create', StripePayment.createPayment);

module.exports = Router;