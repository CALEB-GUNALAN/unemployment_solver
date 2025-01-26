const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, skillsRequired, budget, deadline } = req.body;
  try {
    const task = new Task({
      title,
      description,
      skillsRequired,
      budget,
      deadline,
      createdBy: req.user.id,
    });
    await task.save();
    res.json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Open" }).populate("createdBy", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Place a bid on a task
exports.bidOnTask = async (req, res) => {
  const { taskId } = req.params;
  const { bidAmount, proposal } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.bids.push({ userId: req.user.id, bidAmount, proposal });
    await task.save();
    res.json({ message: "Bid placed successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { assignedTo } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.assignedTo = assignedTo;
    task.status = "In Progress";
    await task.save();
    res.json({ message: "Task assigned successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
