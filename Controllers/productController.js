const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: "Product created", product });
    } catch (err) {
        res.status(500).json({ message: "Failed to create product", error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 12 } = req.query;
        let filter = { isActive: true };
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: 'i' };

        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Product.countDocuments(filter);

        res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ product });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product", error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated", product });
    } catch (err) {
        res.status(500).json({ message: "Failed to update product", error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product", error: err.message });
    }
};

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
