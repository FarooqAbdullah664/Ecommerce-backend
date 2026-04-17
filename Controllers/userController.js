const User = require('../model/authModel');

// Admin: get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
};

// Admin: update user role
const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User role updated", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user", error: err.message });
    }
};

// Admin: delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
