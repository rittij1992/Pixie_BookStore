const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, user_name, role, email_id, password } = req.body;
        /*input of user info taken*/

        // const hashPassword = await bcrypt.hash(password, 10);
        /*Password encryption*/

        const user = new Users({
            first_name,
            last_name,
            user_name,
            role,
            email_id,
            password
        });
        /*New user info model creation*/

        const newUserData = await user.save();
        /*New user model saved*/

        res.status(200).json({
            message: "User registered successfully...",
            newUserData
        });
        /*New user regiter message*/

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { user_name, password } = req.body;
        /*input of user name and password taken*/

        /*const user = await Users.findOne(user_name);
        if (!user) {
            return res.status(400).json({ message: "Invalid user name or password" })
        }*/
        /*user name validation*/

       /* const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user name or password" })
        }*/
        /*user password validation*/

       /* const token = jwt.sign(
            { userId: user._id, userName: user.user_name },
            "I love books",
            { expiresIn: 36000 }
        );
        */
        /*token generation for login*/

        const user = await Users.findUserByCredentials(user_name, password);
        const token = await user.generateUserToken();

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });
        /*Final login message*/

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.getUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const user = await Users.findById({ userId });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        res.status(200).json({
            message: "User found successfully...",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}


exports.updateUser = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email_id, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const updateUser = await Users.findByIdAndUpdate(
            req.userId,
            { first_name, last_name, user_name, email_id, password: hashPassword }
        );
        res.status(200).json({
            message: "User updated successfully",
            updateUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await Users.findByIdAndDelete(req.userId);
        res.status(200).json({
            message: "User deleted successfully",
            deleteUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        await jwt.destroy(req.userId);
        res.status(200).json({
            message: "User logged out successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}