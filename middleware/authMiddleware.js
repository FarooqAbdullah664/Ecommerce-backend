const jwt = require("jsonwebtoken");
const User = require("../model/authModel");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        // Support both cookie and Authorization header (Bearer token)
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Please login." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: "User not found." });
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = auth;
