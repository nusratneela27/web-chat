const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
const createHttpError = require('http-errors');

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const { app, server } = require("./socket/socket");

// const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

// Middleware
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: process.env.CLIENT_URL,
    credentials: true
  }));
// app.use(cors());
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
    app.use("/messages", messageRoutes)
    app.use("/users", userRoutes)

    // 404 handler
    app.use((req, res, next) => {
        next(createHttpError(404, 'Endpoint not found'));
    });

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    // app.get("/", (req, res) => {
    //     res.send("Server is running");
    // });

    // app.listen(port, () => {
    //     console.log(`Server is running on port ${port}`);
    // });
    
}

initializeServer()
