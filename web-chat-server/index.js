const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection and initialize routes
async function initializeServer() {
    await connectDB();

    // Initialize routes
    app.use("/", authRoutes);
    app.use("/messages", messageRoutes)

    app.get("/", (req, res) => {
        res.send("Server is running");
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

initializeServer()
