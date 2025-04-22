import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// User Registration
const registerUser = async (req, res) => {
    const { fullName, username, password, gender } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Insert user into the database
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
        }

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find User by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            success: true,
            message: "Login successful",
        });

    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// User Logout
const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.cookie("jwt", "", {
            maxAge: 0, // Set maxAge to 0 to delete the cookie
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { registerUser, loginUser, logout };

// const bcrypt = require('bcrypt');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');

// // User Registration
// const registerUser = async (req, res) => {
//     const { fullName, username, password, gender } = req.body;

//     try {
//         // Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists"
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // https://avatar-placeholder.iran.liara.run/

//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         // Insert user into the database
//         const newUser = new User({
//             fullName,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//         });

//         if (newUser) {
//             generateToken(newUser._id, res);
//             await newUser.save();
//         }

//         res.status(201).json({
//             _id: newUser._id,
//             fullName: newUser.fullName,
//             username: newUser.username,
//             profilePic: newUser.profilePic,
//             success: true,
//             message: "User registered successfully"
//         });
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // User Login
// const loginUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Find User by username
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // Compare hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // Generate JWT token

//         generateToken(user._id, res);

//         res.status(200).json({
//             _id: user._id,
//             fullName: user.fullName,
//             username: user.username,
//             profilePic: user.profilePic,
//             success: true,
//             message: "Login successful",
//         });

//     } catch (error) {
//         console.error("Error logging in user:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // User Logout
// const logout = async (req, res) => {
//     try {
//         // Clear the JWT cookie
//         res.cookie("jwt", "", {
//             maxAge: 0, // Set maxAge to 0 to delete the cookie
//         });

//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         console.error("Error logging out user:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// }

// module.exports = { registerUser, loginUser, logout };
