import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true,
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//     },
//     profilePic: {
//         type: String,
//         default: "",
//     },
// },
//     { timestamps: true, }
// );

// const User = mongoose.model("User", userSchema);

// module.exports = User;
