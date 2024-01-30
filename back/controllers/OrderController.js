const nodemailer = require('nodemailer');
const OrderItems = require('../models/OrderItems');
const ShippingDetails = require('../models/ShippingDetails');
const Order = require('../models/Order');
const BillingDetails = require('../models/BillingDetails');
const GuestUser = require('../models/GuestUser');



exports.getOrder = async (req, res) => {
    try {
        const guest = await GuestUser.find();
        const orderList = await Order.find();
        const orderItemList = await OrderItems.find();
        const billing = await BillingDetails.find();
        const shipping = await ShippingDetails.find();
        res.status(200).json({
            message: "Order detail list fetched successfully",
            guest,
            orderItemList,
            billing,
            shipping,
            orderList
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        const items = await OrderItems.find({ order_id: orderId });
        const itemsA = [items].flat();
        res.status(200).json({
            message: "Order details fetched successfully",
            order,
            itemsA
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}




exports.newOrder = async (req, res) => {

    try {
        const { billingData, shippingData, cartData } = req.body;

        const existingUser = await GuestUser.findOne({ user_emailId: billingData.billingEmailId });
        // console.log(existingUser, "user");

        if (!existingUser) {
            const newGuestUser = new GuestUser({
                user_firstName: billingData.billingFirstName,
                user_lastName: billingData.billingLastName,
                user_phoneNo: billingData.billingPhoneNo,
                user_emailId: billingData.billingEmailId
            });
            const newGuestUserData = await newGuestUser.save();
            //guest user registered.

            const { order_status, order_total } = req.body;
            const newOrder = new Order({ customer_id: newGuestUserData._id, order_status, order_total });
            const newOrderData = await newOrder.save();
            // new order created.

            if (newOrderData) {

                const order_id = newOrderData._id;
                cartData.map(async function (item) {
                    let book_cover = item.coverImage;
                    let book_id = item._id;
                    let book_name = item.name;
                    let quantity = item.qty;
                    let unit_price = item.price;
                    let discount = 0;

                    const newOrderItems = new OrderItems({ order_id, book_id, book_cover, book_name, quantity, unit_price, discount });
                    await newOrderItems.save();
                })
                // for (let item in cartData) {
                //     let book_id = item._id;
                //     let book_name = item.name;
                //     let quantity = item.qty;
                //     let unit_price = item.price;
                //     let discount = 0;

                //     const newOrderItems = new OrderItems({ order_id, book_id, book_name, quantity, unit_price, discount });
                //     // const newOrderItemData = await newOrderItems.save();
                //     console.log(newOrderItems);
                // }
            }
            // each cart items inserted through loop only if new order is present.

            const newBillingdetails = new BillingDetails({
                order_id: newOrderData._id,
                billingCustomerId: newGuestUserData._id,
                billingFirstName: billingData.billingFirstName,
                billingLastName: billingData.billingLastName,
                billingEmailId: billingData.billingEmailId,
                billingPhoneNo: billingData.billingPhoneNo,
                billingAddress: billingData.billingAddress,
                billingLandmark: billingData.billingLandmark,
                billingPinCode: billingData.billingPinCode,
                billingCity: billingData.billingCity,
                billingState: billingData.billingState
            });
            await newBillingdetails.save();
            // billing details intserted.

            const checkShippingData = Object.values(shippingData);
            if (checkShippingData.length !== 0) {
                const newShippingDetails = new ShippingDetails({
                    order_id: newOrderData._id,
                    shippingFirstName: shippingData.shippingFirstName,
                    shippingPhoneNo: shippingData.shippingPhoneNo,
                    shippingAddress: shippingData.shippingAddress,
                    shippingLandmark: shippingData.shippingLandmark,
                    shippingPinCode: shippingData.shippingPinCode,
                    shippingCity: shippingData.shippingCity,
                    shippingState: shippingData.shippingState,
                    shippingLastName: shippingData.shippingLastName
                })
                await newShippingDetails.save();

            } else {
                const newShippingDetails = new ShippingDetails({
                    order_id: newOrderData._id,
                    shippingFirstName: billingData.billingFirstName,
                    shippingPhoneNo: billingData.billingPhoneNo,
                    shippingAddress: billingData.billingAddress,
                    shippingLandmark: billingData.billingLandmark,
                    shippingPinCode: billingData.billingPinCode,
                    shippingCity: billingData.billingCity,
                    shippingState: billingData.billingState,
                    shippingLastName: billingData.billingLastName
                });
                await newShippingDetails.save();
            }
            // check if any values present in shipping data object, if present, populate the collection with shipping details,
            // else, populate with billing data.

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            let mailDetail = {
                from: process.env.EMAIL,
                to: billingData.billingEmailId,
                subject: "Order No. " + newOrderData._id + " initiated",
                text: "Your order NO. " + newOrderData._id + " initiated successfully. " + "You ordered " + cartData.length + " items and your order total is Rs " + newOrderData.order_total + ". " +
                    "Make payment to place the order successfully. **This is an auto generated message, do not reply.**"
            };

            transporter.sendMail(mailDetail, (err) => {
                if (err) {
                    res.status(400).json({
                        message: err.message
                    })

                } else {
                    res.status(201).json({
                        message: "Order initiation message sent...",
                        mailDetail, newOrderData, newBillingdetails, shippingData, cartData, newGuestUserData
                    })
                }
            })

        } else {

            const { order_status, order_total } = req.body;
            const newOrder = new Order({ customer_id: existingUser._id, order_status, order_total });
            const newOrderData = await newOrder.save();
            // new order created.

            if (newOrderData) {

                const order_id = newOrderData._id;
                cartData.map(async function (item) {
                    let book_cover = item.coverImage;
                    let book_id = item._id;
                    let book_name = item.name;
                    let quantity = item.qty;
                    let unit_price = item.price;
                    let discount = 0;

                    const newOrderItems = new OrderItems({ order_id, book_id, book_cover, book_name, quantity, unit_price, discount });
                    await newOrderItems.save();
                })
                // for (let item in cartData) {
                //     let book_id = item._id;
                //     let book_name = item.name;
                //     let quantity = item.qty;
                //     let unit_price = item.price;
                //     let discount = 0;

                //     const newOrderItems = new OrderItems({ order_id, book_id, book_name, quantity, unit_price, discount });
                //     // const newOrderItemData = await newOrderItems.save();
                //     console.log(newOrderItems);
                // }
            }
            // each cart items inserted through loop only if new order is present.

            const newBillingdetails = new BillingDetails({
                order_id: newOrderData._id,
                billingCustomerId: existingUser._id,
                billingFirstName: billingData.billingFirstName,
                billingLastName: billingData.billingLastName,
                billingEmailId: billingData.billingEmailId,
                billingPhoneNo: billingData.billingPhoneNo,
                billingAddress: billingData.billingAddress,
                billingLandmark: billingData.billingLandmark,
                billingPinCode: billingData.billingPinCode,
                billingCity: billingData.billingCity,
                billingState: billingData.billingState
            });
            await newBillingdetails.save();
            // billing details intserted.

            const checkShippingData = Object.values(shippingData);
            if (checkShippingData.length !== 0) {
                const newShippingDetails = new ShippingDetails({
                    order_id: newOrderData._id,
                    shippingFirstName: shippingData.shippingFirstName,
                    shippingPhoneNo: shippingData.shippingPhoneNo,
                    shippingAddress: shippingData.shippingAddress,
                    shippingLandmark: shippingData.shippingLandmark,
                    shippingPinCode: shippingData.shippingPinCode,
                    shippingCity: shippingData.shippingCity,
                    shippingState: shippingData.shippingState,
                    shippingLastName: shippingData.shippingLastName
                })
                await newShippingDetails.save();

            } else {
                const newShippingDetails = new ShippingDetails({
                    order_id: newOrderData._id,
                    shippingFirstName: billingData.billingFirstName,
                    shippingPhoneNo: billingData.billingPhoneNo,
                    shippingAddress: billingData.billingAddress,
                    shippingLandmark: billingData.billingLandmark,
                    shippingPinCode: billingData.billingPinCode,
                    shippingCity: billingData.billingCity,
                    shippingState: billingData.billingState,
                    shippingLastName: billingData.billingLastName
                });
                await newShippingDetails.save();
            }
            // check if any values present in shipping data object, if present, populate the collection with shipping details,
            // else, populate with billing data.

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            let mailDetail = {
                from: process.env.EMAIL,
                to: billingData.billingEmailId,
                subject: "Order No. " + newOrderData._id + " initiated",
                text: "Your order NO. " + newOrderData._id + " initiated successfully. " + "You ordered " + cartData.length + " items and your order total is Rs " + newOrderData.order_total + ". " +
                    "Make payment to place the order successfully. **This is an auto generated message, do not reply.**"
            };

            transporter.sendMail(mailDetail, (err) => {
                if (err) {
                    res.status(400).json({
                        message: err.message
                    })

                } else {
                    res.status(201).json({
                        message: "Order initiation message sent...",
                        mailDetail, newOrderData, newBillingdetails, shippingData, cartData, existingUser
                    })
                }
            })
        }

        // Order initiation email sent to the guest user.

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.updatePaymentStatus = async (req, res)=> {
    const {order_id} = req.body;
    try {
        updateOrder = await Order.findByIdAndUpdate({_id: order_id},
            {
                order_status : "success"
            });
        res.status(201).json({
            message: "Payment status updated...",
            paymentStatus : order_id,
            updateOrder
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}