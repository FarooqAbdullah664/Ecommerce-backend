const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "Please fill all fields" });

        const existUser = await User.findOne({ email });
        if (existUser)
            return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.status(201).json({
            message: "Account created successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Please fill all fields" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

const Logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

const getMe = async (req, res) => {
    res.json({ user: req.user });
};

module.exports = { Signup, Login, Logout, getMe };
