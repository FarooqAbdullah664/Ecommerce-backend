const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const { saveCard, getMyCards, deleteCard, getAllCards, adminDeleteCard } = require("../Controllers/cardController");

router.post("/", auth, saveCard);
router.get("/my", auth, getMyCards);
router.delete("/my/:id", auth, deleteCard);
router.get("/", auth, verifyAdmin, getAllCards);
router.delete("/:id", auth, verifyAdmin, adminDeleteCard);

module.exports = router;
