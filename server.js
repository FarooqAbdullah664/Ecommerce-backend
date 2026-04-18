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

// DB connection (safe for serverless)
Db();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// ❌ NO app.listen()

module.exports = app;