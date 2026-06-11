const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const Db = require('./Db/dbconnection');
require("dotenv").config();

const authRoute = require("./Router/authRouter");
const productRoutes = require("./Router/productRoutes");
const orderRoutes = require("./Router/orderRoutes");
const userRoutes = require("./Router/userRoutes");
const cardRoutes = require("./Router/cardRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Vercel serverless ke liye - har request se pehle DB connect karo
app.use(async (req, res, next) => {
    try {
        await Db();
        next();
    } catch (err) {
        res.status(500).json({ message: "Database connection failed", error: err.message });
    }
});

// CORS - allow all origins in development
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/{*path}", cors()); // preflight for Express 5

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({ message: "ShopZone Backend Running 🚀" }));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);

app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port: ${PORT}`);
});

module.exports = app;
