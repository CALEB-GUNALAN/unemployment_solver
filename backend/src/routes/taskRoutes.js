const express = require("express");
const {
  createTask,
  getTasks,
  bidOnTask,
  assignTask,
} = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createTask);
router.get("/", protect, getTasks);
router.post("/bid/:taskId", protect, bidOnTask);
router.put("/assign/:taskId", protect, assignTask);

module.exports = router;
