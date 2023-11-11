const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    billingCustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GuestUser'
    },
    billingFirstName: {
        type: String,
        require: true
    },
    billingLastName: {
        type: String,
        require: true
    },
    billingEmailId: {
        type: String,
        require: true
    },
    billingPhoneNo: {
        type: Number,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    billingLandmark: {
        type: String,
        require: true
    },
    billingPinCode: {
        type: String,
       required: true
    },
    billingCity: {
        type: String,
        required: true
    },
    billingState: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BillingDetails", billingSchema);