import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    // Generate JWT token with user ID as payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Set to true if using HTTPS
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        sameSite: "strict", // CSRF protection
    });
};

export default generateToken;

// const jwt = require('jsonwebtoken');

// const generateToken = (userId, res) => {
//     // Generate JWT token with user ID as payload
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: '30d',
//     });

//     res.cookie("jwt", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "development", // Set to true if using HTTPS
//         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
//         sameSite: "Strict", // CSRF protection
//     });
// }

// module.exports = generateToken;