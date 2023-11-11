const mongoose = require('mongoose');
const Role = require('./Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: [true, "please enter your unique user name"],
        unique: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        validate: {
            validator: (password) => {
                return password.length >= 8
            },
            message: "password must be minimum of 8 charecter long"
        }
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Role
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.statics.findUserByCredentials = async function(user_name, password) {
    const User = this;
    const user = await User.findOne({user_name}).populate("role");
    if(!user) {
        throw new Error("invalid username");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new Error("invalid password");
    }
    if(user.status == "inactive") {
        throw new Error("user not verified yet")
    }
    return user;
}

userSchema.methods.generateUserToken = async function () {
    try {
        const token = await jwt.sign(
            { _id: this._id, user_name: this.user_name, role: this.role.name },
            process.env.JWT_SECRET,
            { expiresIn: 36000 }
        )
        return token;
    } catch (error) {
        console.log(error);
    }
}


module.exports = mongoose.model("Users", userSchema);