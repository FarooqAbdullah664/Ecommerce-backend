const mongoose = require("mongoose");
require("dotenv").config();

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbCon() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI)
            .then((m) => { console.log("✅ Database connected"); return m; })
            .catch((err) => { cached.promise = null; throw err; });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = dbCon;
