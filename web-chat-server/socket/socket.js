const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const Message = require("../models/messageModel");

const app = express();
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId: socketId}
const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // ✅ Mark a single message as read
  socket.on("messageRead", async ({ messageId }) => {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { status: "read" },
        { new: true }
      );
      if (updatedMessage) {
        const senderSocketId = getReceiverSocketId(updatedMessage.senderId.toString());
        if (senderSocketId) {
          io.to(senderSocketId).emit("messageStatusUpdate", {
            messageId,
            status: "read",
          });
        }
      }
    } catch (error) {
      console.error("Error marking message as read:", error.message);
    }
  });

  // ✅ Mark all messages from a user as read
  socket.on("markAllAsRead", async ({ senderId, receiverId }) => {
    try {
      await Message.updateMany(
        { senderId, receiverId, status: { $ne: "read" } },
        { $set: { status: "read" } }
      );
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesMarkedAsRead", {
          senderId,
          receiverId,
        });
      }
    } catch (err) {
      console.error("Bulk read update error:", err.message);
    }
  });

  // socket.on("typing", ({ senderId, receiverId }) => {
  //   io.to(receiverId).emit("typing", { senderId, receiverId });
  // });
  
  // socket.on("stopTyping", ({ senderId, receiverId }) => {
  //   io.to(receiverId).emit("stopTyping", { senderId, receiverId });
  // });
  
});

module.exports = { app, io, server, getReceiverSocketId };

// =========== without indicator ====================

// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();

// require("dotenv").config();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         // origin: "http://localhost:5173",
//         origin: process.env.CLIENT_URL,
//         methods: ["GET", "POST"],
//         // credentials: true,
//     },
// });

// const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId];
// };

// const userSocketMap = {}; //{userId: socketId};

// io.on("connection", (socket) => {
//     // console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId;
//     if (userId != "undefined") userSocketMap[userId] = socket.id;
//     // io.emit() is used to send events to all the connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));


//     // socket.on() is used to listen to the events. can be used both on client and server side
//     socket.on("disconnect", () => {
//         // console.log("A user disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// })

// module.exports = { app, io, server, getReceiverSocketId};