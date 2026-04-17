const mongoose = require("mongoose");
require("dotenv").config();

async function dbCon() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.log("❌ Database connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = dbCon;
