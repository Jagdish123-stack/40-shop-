const mongoose = require("mongoose");

const flashDealSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    dealPrice: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
    },
    maxQuantity: {
      type: Number,
      required: true,
    },
    soldQuantity: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlashDeal", flashDealSchema);