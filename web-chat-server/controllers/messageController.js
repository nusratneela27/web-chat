import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import createHttpError from 'http-errors';
import path from 'path';

const sendMessage = async (req, res, next) => {
    try {
        const { message: textMessage } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const senderUsername = req.user.username;

        // Validate input
        if (!textMessage && !req.file) {
            throw createHttpError(400, 'Message or image is required');
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            senderUsername,
            receiverId,
            status: "sent",
        });

        // Handle image or text message
        if (req.file) {
            newMessage.image = `/images/${req.file.filename}`;
            newMessage.isImage = true;
            if (textMessage) {
                newMessage.message = textMessage; // Optional caption
            }
        } else {
            newMessage.message = textMessage;
            newMessage.isImage = false;
        }

        // Save message and update conversation
        conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        // Socket.io notification
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            newMessage.status = "delivered";
            await newMessage.save();
            io.to(receiverSocketId).emit("newMessage", newMessage.toObject());
        }

        res.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages');

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);
    } catch (error) {
        next(error);
    }
};

export { sendMessage, getMessages };

// const Conversation = require("../models/conversationModel");
// const Message = require("../models/messageModel");
// const User = require("../models/userModel");
// const { getReceiverSocketId, io } = require("../socket/socket");
// const createHttpError = require('http-errors');
// const path = require('path');

// const sendMessage = async (req, res, next) => {
//     try {
//         const { message: textMessage } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;
//         const senderUsername = req.user.username;

//         // Validate input
//         if (!textMessage && !req.file) {
//             throw createHttpError(400, 'Message or image is required');
//         }

//         // Find or create conversation
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//             });
//         }

//         // Create new message
//         const newMessage = new Message({
//             senderId,
//             senderUsername,
//             receiverId,
//             status: "sent",
//         });

//         // Handle image or text message
//         if (req.file) {
//             newMessage.image = `/images/${req.file.filename}`;
//             newMessage.isImage = true;
//             if (textMessage) {
//                 newMessage.message = textMessage; // Optional caption
//             }
//         } else {
//             newMessage.message = textMessage;
//             newMessage.isImage = false;
//         }

//         // Save message and update conversation
//         conversation.messages.push(newMessage._id);
//         await Promise.all([conversation.save(), newMessage.save()]);

//         // Socket.io notification
//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if (receiverSocketId) {
//             newMessage.status = "delivered";
//             await newMessage.save();
//             io.to(receiverSocketId).emit("newMessage", newMessage.toObject());
//         }

//         res.status(201).json(newMessage);
//     } catch (error) {
//         next(error);
//     }
// };

// const getMessages = async (req, res, next) => {
//     try {
//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] },
//         }).populate('messages');

//         if (!conversation) return res.status(200).json([]);

//         res.status(200).json(conversation.messages);
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = { sendMessage, getMessages };

// =================== senderUsername for toast ================
// const Conversation = require("../models/conversationModel");
// const Message = require("../models/messageModel");
// const { getReceiverSocketId, io } = require("../socket/socket");

// const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;
//         const senderUsername = req.user.username;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             senderUsername,
//             receiverId,
//             message,
//             status: "sent",
//         });

//         conversation.messages.push(newMessage._id);

//         // SOCKET IO FUNCTIONALITY WILL GO HERE
//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if (receiverSocketId) {
//             newMessage.status = "delivered";
//             await newMessage.save();

//             io.to(receiverSocketId).emit("newMessage" , {
//                 ...newMessage.toObject(),
//                 senderName : senderUsername
//             });
//         }

//         await Promise.all([conversation.save(), newMessage.save()]);

//         res.status(201).json(newMessage);
//     } catch (error) {
//         console.error('Error sending message:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }

// }

// const getMessages = async (req, res) => {
//     try {

//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] },
//         }).populate('messages');

//         if (!conversation) return res.status(200).json([]);

//         const messages = conversation.messages;

//         res.status(200).json(messages);

//     } catch (error) {
//         console.error('Error fetching messages:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// module.exports = { sendMessage, getMessages };

// =========== without indicator ====================

// const Conversation = require("../models/conversationModel");
// const Message = require("../models/messageModel");
// const { getReceiverSocketId, io } = require("../socket/socket");

// const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message,
//         });

//         if (newMessage) {
//             conversation.messages.push(newMessage._id);
//         }

//         // await newMessage.save();
//         //  conversation.messages.push(newMessage._id);
//         //  await conversation.save();

//         // this will run in parallel
//         await Promise.all([conversation.save(), newMessage.save()]);

//         // SOCKET IO FUNCTIONALITY WILL GO HERE
// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			// io.to(<socket_id>).emit() used to send events to specific client
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

//         res.status(201).json(newMessage);
//     } catch (error) {
//         console.error('Error sending message:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }

// }

// const getMessages = async (req, res) => {
//     try {

//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] },
//         }).populate('messages');

//         if (!conversation) return res.status(200).json([]);

//         const messages = conversation.messages;

//         res.status(200).json(messages);

//     } catch (error) {
//         console.error('Error fetching messages:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// module.exports = { sendMessage, getMessages };
