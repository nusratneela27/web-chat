const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            status: "sent",
        });

        conversation.messages.push(newMessage._id);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            newMessage.status = "delivered";
            await newMessage.save();
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages');

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { sendMessage, getMessages };

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
