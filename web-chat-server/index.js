import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';

import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

// MongoDB connection and initialize routes
async function initializeServer() {
    await connectDB();

    // Initialize routes
    app.use("/", authRoutes);
    app.use("/messages", messageRoutes);
    app.use("/users", userRoutes);

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../web-chat-client/dist")));

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../web-chat-client", "dist", "index.html"));
        });
    }

    // 404 handler
    app.use((req, res, next) => {
        next(createHttpError(404, 'Endpoint not found'));
    });

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

initializeServer();

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require('path');
// const createHttpError = require('http-errors');

// const connectDB = require("./config/database");
// const authRoutes = require("./routes/authRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const userRoutes = require("./routes/userRoutes");
// const { app, server } = require("./socket/socket");

// // const app = express();
// const port = process.env.PORT || 5000;
// const __dirname = path.resolve();

// require("dotenv").config();

// // Middleware
// app.use(cors({
//     // origin: 'http://localhost:5173',
//     origin: process.env.CLIENT_URL,
//     credentials: true
//   }));
// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Serve static files
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(err.status || 500).json({
//         error: err.message || 'Internal Server Error'
//     });
// });

// // MongoDB connection and initialize routes
// async function initializeServer() {
//     await connectDB();

//     // Initialize routes
//     app.use("/", authRoutes);
//     app.use("/messages", messageRoutes)
//     app.use("/users", userRoutes)

//     if (process.env.NODE_ENV === "production") {
//         app.use(express.static(path.join(__dirname, "../web-chat-client/dist")))

//         app.get("*", (req, res) => {
//             res.sendFile(path.join(__dirname, "../web-chat-client", "dist", "index.html"));
//           });
//     };

//     // 404 handler
//     app.use((req, res, next) => {
//         next(createHttpError(404, 'Endpoint not found'));
//     });

//     server.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });

//     // app.get("/", (req, res) => {
//     //     res.send("Server is running");
//     // });

//     // app.listen(port, () => {
//     //     console.log(`Server is running on port ${port}`);
//     // });
    
// }

// initializeServer()
