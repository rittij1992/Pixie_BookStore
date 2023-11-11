const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GuestUser'
    },
    order_status: {
        type: String,
        enum: ["pending", "success"],
        default: "pending"
    },
    order_total: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);