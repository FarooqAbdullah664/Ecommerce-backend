const Order = require('../model/orderModel');
const Product = require('../model/productModel');

// Buyer: place order
const placeOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;
        if (!items || items.length === 0)
            return res.status(400).json({ message: "No items in order" });

        // Check stock and deduct
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: `Product not found: ${item.name}` });
            if (product.stock < item.quantity)
                return res.status(400).json({ message: `Insufficient stock for: ${product.name}` });
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({ message: "Failed to place order", error: err.message });
    }
};

// Buyer: get my orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name image')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};

// Admin: get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};

// Admin: update order status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ message: "Failed to update order", error: err.message });
    }
};

// Admin: delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete order", error: err.message });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder };
