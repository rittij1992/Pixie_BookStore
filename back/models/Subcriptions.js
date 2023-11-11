const mongoose = require('mongoose');

const subscritionSchema = new mongoose.Schema({
    subscriber_email: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subscription', subscritionSchema);