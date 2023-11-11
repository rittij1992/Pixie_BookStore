const mongoose = require('mongoose');

const shippingDetailSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    shippingFirstName: {
        type: String,
        require: true
    },
    shippingLastName: {
        type: String,
        require: true
    },
    shippingPhoneNo: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    shippingLandmark:{
        type: String,
        required: true
    },
    shippingPinCode: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingState: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ShippingDetails", shippingDetailSchema);