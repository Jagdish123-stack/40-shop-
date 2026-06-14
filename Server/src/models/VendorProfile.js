const mongoose = require("mongoose");

const vendorProfileSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Aadhar verification
    aadharNumber: {
      type: String,
      trim: true,
    },
    aadharVerified: {
      type: Boolean,
      default: false,
    },
    // Udyam registration
    udyamNumber: {
      type: String,
      trim: true,
    },
    udyamVerified: {
      type: Boolean,
      default: false,
    },
    // GST details
    gstin: {
      type: String,
      trim: true,
    },
    gstVerified: {
      type: Boolean,
      default: false,
    },
    // Bank details
    bankAccount: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      accountHolderName: String,
    },
    // Business details
    businessName: {
      type: String,
      trim: true,
    },
    businessCategory: {
      type: String,
      enum: ["Textiles", "FMCG", "Agri", "Pharma", "Electronics", "Machinery"],
    },
    businessAddress: {
      fullAddress: String,
      city: String,
      state: String,
      pincode: String,
    },
    // Onboarding status
    onboardingStep: {
      type: Number,
      default: 1,
    },
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
    // Subscription
    subscriptionTier: {
      type: String,
      enum: ["silver", "gold", "platinum"],
      default: "silver",
    },
  },
  {
    timestamps: true,
  }
);

const VendorProfile = mongoose.model("VendorProfile", vendorProfileSchema);

module.exports = VendorProfile;