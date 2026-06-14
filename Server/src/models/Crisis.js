const mongoose = require("mongoose");

const crisisSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Crisis title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    affectedRegions: [
      {
        city: String,
        state: String,
      },
    ],
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Crisis = mongoose.model("Crisis", crisisSchema);

module.exports = Crisis;