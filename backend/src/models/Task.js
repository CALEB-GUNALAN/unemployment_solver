const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bids: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      bidAmount: { type: Number, required: true },
      proposal: { type: String, required: true },
    },
  ],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Open" }, // Open, In Progress, Completed
});

module.exports = mongoose.model("Task", taskSchema);
