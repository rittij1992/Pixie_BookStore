const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    
    fullName:{
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        unique: true,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message_details: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContactUs', contactUsSchema);