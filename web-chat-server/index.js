const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection and initialize routes
async function initializeServer() {
    await connectDB();

    // Initialize routes
    app.use("/", authRoutes);
    app.use("/messages", messageRoutes)
    app.use("/users", userRoutes)

    app.get("/", (req, res) => {
        res.send("Server is running");
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

initializeServer()
