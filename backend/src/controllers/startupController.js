const Startup = require("../models/Startup");

// Create a new startup
exports.createStartup = async (req, res) => {
  const { name, description, fundingRequired } = req.body;
  try {
    const startup = new Startup({
      name,
      description,
      fundingRequired,
      createdBy: req.user.id,
      members: [req.user.id],
    });
    await startup.save();
    res.json({ message: "Startup created successfully", startup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all startups
exports.getStartups = async (req, res) => {
  try {
    const startups = await Startup.find().populate("members", "name email");
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a member to a startup
exports.addMember = async (req, res) => {
  const { startupId } = req.params;
  const { memberId } = req.body;
  try {
    const startup = await Startup.findById(startupId);
    if (!startup) return res.status(404).json({ message: "Startup not found" });

    startup.members.push(memberId);
    await startup.save();
    res.json({ message: "Member added successfully", startup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fund a startup
exports.fundStartup = async (req, res) => {
  const { startupId } = req.params;
  try {
    const startup = await Startup.findById(startupId);
    if (!startup) return res.status(404).json({ message: "Startup not found" });

    startup.status = "Funded";
    await startup.save();
    res.json({ message: "Startup funded successfully", startup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
