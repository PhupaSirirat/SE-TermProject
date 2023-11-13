const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Favourite = require("../models/favouriteModel.js"); // import Favourite model

const userRegister = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!(identifier && password)) {
            return res.status(400).send("Missing required fields.");
        }

        // Regular expression to validate an email
        const emailRegex = /\S+@\S+\.\S+/;
        // Regular expression to validate a phone number (modify the regex to match your requirements)
        const phoneRegex = /^\d{10}$/;

        let userObj = {};
        if (emailRegex.test(identifier)) {
            userObj.email = identifier;
        } else if (phoneRegex.test(identifier)) {
            userObj.phone = identifier;
        } else {
            return res.status(400).send("Identifier must be a valid email or phone number.");
        }

        // Check if user already exists with this email or phone
        const oldUser = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (oldUser) {
            return res.status(409).send("User already exists.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Set the password for the user object
        userObj.password = encryptedPassword;

        // Create user with email or phone
        const user = await User.create(userObj);

        // Respond with the new user object, without sensitive data
        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        delete userResponse.__v; // Remove version key
        res.status(201).json(userResponse);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};

const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!(identifier && password)) {
            return res.status(400).send("Missing required fields.");
        }

        // Regular expression to validate an email
        const emailRegex = /\S+@\S+\.\S+/;
        // Regular expression to validate a phone number (modify the regex to match your requirements)
        const phoneRegex = /^\d{10}$/;

        let userQuery = {};
        if (emailRegex.test(identifier)) {
            userQuery.email = identifier;
        } else if (phoneRegex.test(identifier)) {
            userQuery.phone = identifier;
        } else {
            return res.status(400).send("Identifier must be a valid email or phone number.");
        }

        const user = await User.findOne(userQuery);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email: user.email, phone: user.phone },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // Set token as a cookie in the response
            res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // 2 hours in milliseconds

            // Do not send back the password
            const userResponse = { ...user.toObject() };

            // Not sure what this for.
            // delete userResponse.password;
            // delete userResponse.__v; // Remove version key

            res.status(200).json(userResponse);

        } else {
            res.status(401).send("Invalid credentials.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};

const userLogout = async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie('token');
        res.status(200).send('User logged out successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    userRegister,
    userLogin,
    userLogout,
}