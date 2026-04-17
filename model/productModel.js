const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, trim: true },
    sku: { type: String, unique: true, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Products", ProductSchema);
