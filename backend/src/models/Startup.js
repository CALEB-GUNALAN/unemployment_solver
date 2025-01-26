const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  fundingRequired: { type: Number, required: true },
  status: { type: String, default: "Seeking Funding" }, // Seeking Funding, Funded
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Startup", startupSchema);
