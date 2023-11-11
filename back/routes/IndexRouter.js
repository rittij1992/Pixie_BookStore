const express = require('express');
const router = express.Router();

const userRouter = require('./UserRouter');
const roleRouter = require('./RoleRouter');
const categoryRouter  = require('./CategoryRouter');
const bookRouter = require('./BookRouter');
const orderRouter = require('./OrderRouter');
const SubscriptionRouter = require('./SubscriberRoute');

router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/categories', categoryRouter);
router.use('/books', bookRouter);
router.use('/orders', orderRouter);
router.use('/contactAndSubscribe', SubscriptionRouter);


module.exports = router;