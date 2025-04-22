import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        senderUsername: {
            type: String,
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
        isImage: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;

// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema(
//     {
//         senderId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         senderUsername: {
//             type: String,
//             required: true,
//         },
//         receiverId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         message: {
//             type: String,
//         },
//         image: {
//             type: String,
//         },
//         status: {
//             type: String,
//             enum: ["sent", "delivered", "read"],
//             default: "sent",
//         },
//         isImage: {
//             type: Boolean,
//             default: false,
//         },
//     },
//     { timestamps: true }
// );

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

// =============== senderUserName ===============

// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema(
//     {
//         senderId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         senderUsername: {
//             type: String,
//             required: true,
//         },
//         receiverId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         message: {
//             type: String,
//             required: true,
//         },
//         status: {
//             type: String,
//             enum: ["sent", "delivered", "read"],
//             default: "sent",
//         },
//     },
//     { timestamps: true }
// );

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

// =========== without indicator ====================

// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema(
//     {
//         senderId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         receiverId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         message: {
//             type: String,
//             required: true,
//         },
//     },
//     { timestamps: true }
// );

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;
