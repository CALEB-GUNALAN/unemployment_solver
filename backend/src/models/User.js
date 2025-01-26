const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  profileCompleted: { type: Boolean, default: false },
  isFreelancer: { type: Boolean, default: false },
  isStartupMember: { type: Boolean, default: false },
  startupName: { type: String, default: "" },
  startupRole: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  portfolio: { type: String, default: "" }, // URL to portfolio or resume
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);