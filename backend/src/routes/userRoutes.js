const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateFreelanceProfile,
  updateStartupProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", protect, getUserProfile);
router.put("/freelance/update", protect, updateFreelanceProfile);
router.put("/startup/update", protect, updateStartupProfile);

module.exports = router;
