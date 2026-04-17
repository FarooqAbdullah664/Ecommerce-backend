const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../Controllers/orderController");

router.post("/", auth, placeOrder);
router.get("/my", auth, getMyOrders);
router.get("/", auth, verifyAdmin, getAllOrders);
router.put("/:id/status", auth, verifyAdmin, updateOrderStatus);
router.delete("/:id", auth, verifyAdmin, deleteOrder);

module.exports = router;
