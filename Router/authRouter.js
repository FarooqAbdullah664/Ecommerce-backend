const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { Signup, Login, Logout, getMe } = require("../Controllers/authController");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", auth, getMe);

module.exports = router;
