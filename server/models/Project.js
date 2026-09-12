const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tag: { type: String, default: "" },
    confidence: { type: Number, min: 0, max: 1, default: 0.9 },
    description: { type: String, required: true },
    stack: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    link: { type: String, default: "" },
    demoUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
