const mongoose = require("mongoose");

const rfqSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Textiles", "FMCG", "Agri", "Pharma", "Electronics", "Machinery"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "kg",
    },
    targetPrice: {
      type: Number,
    },
    deliveryCity: {
      type: String,
      trim: true,
    },
    deliveryState: {
      type: String,
      trim: true,
    },
    requiredByDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "responded", "accepted", "closed"],
      default: "open",
    },
    quotes: [
      {
        vendor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        pricePerUnit: Number,
        deliveryDays: Number,
        validUntil: Date,
        note: String,
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RFQ", rfqSchema);