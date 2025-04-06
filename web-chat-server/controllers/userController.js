const User = require("../models/userModel");

const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user.id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error fetching users for sidebar:", error).message;
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getUsersForSidebar }