const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    book_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Books',
        required: true
    },
    book_cover: {
        type: String,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("OrderItems", orderItemsSchema);