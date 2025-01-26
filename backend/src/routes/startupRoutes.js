const express = require("express");
const {
  createStartup,
  getStartups,
  addMember,
  fundStartup,
} = require("../controllers/startupController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createStartup);
router.get("/", protect, getStartups);
router.put("/add-member/:startupId", protect, addMember);
router.put("/fund/:startupId", protect, fundStartup);

module.exports = router;
