const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const { getAllUsers, updateUserRole, deleteUser } = require("../Controllers/userController");

router.get("/", auth, verifyAdmin, getAllUsers);
router.put("/:id/role", auth, verifyAdmin, updateUserRole);
router.delete("/:id", auth, verifyAdmin, deleteUser);

module.exports = router;
