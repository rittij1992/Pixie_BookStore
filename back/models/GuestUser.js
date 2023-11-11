const mongoose = require("mongoose");

const guestUserSchema = new mongoose.Schema({
    user_firstName: {
        type: String,
        required: true
    },
    user_lastName: {
        type: String,
        required: true
    },
    user_phoneNo: {
        type: Number,
        required: true
    },
    user_emailId: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("GuestUser", guestUserSchema);