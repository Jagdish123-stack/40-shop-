const VendorProfile = require("../models/VendorProfile");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// STEP 1 — Aadhar Verify
const verifyAadhar = async (req, res) => {
  try {
    const { aadharNumber } = req.body;

    if (!aadharNumber || aadharNumber.length !== 12) {
      return errorResponse(res, 400, "Valid 12-digit Aadhar number required");
    }

    let profile = await VendorProfile.findOne({ vendor: req.user.id });

    if (!profile) {
      profile = await VendorProfile.create({
        vendor: req.user.id,
        aadharNumber,
        aadharVerified: true,
        onboardingStep: 2,
      });
    } else {
      profile.aadharNumber = aadharNumber;
      profile.aadharVerified = true;
      profile.onboardingStep = 2;
      await profile.save();
    }

    return successResponse(res, 200, "Aadhar verified! Move to step 2.", {
      profile,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// STEP 2 — Udyam Verify
const verifyUdyam = async (req, res) => {
  try {
    const { udyamNumber, businessName, businessCategory } = req.body;

    if (!udyamNumber) {
      return errorResponse(res, 400, "Udyam number required");
    }

    const profile = await VendorProfile.findOne({ vendor: req.user.id });

    if (!profile) {
      return errorResponse(res, 404, "Complete Step 1 first");
    }

    profile.udyamNumber = udyamNumber;
    profile.udyamVerified = true;
    profile.businessName = businessName;
    profile.businessCategory = businessCategory;
    profile.onboardingStep = 3;
    await profile.save();

    // Update user businessName
    await User.findByIdAndUpdate(req.user.id, { businessName });

    return successResponse(res, 200, "Udyam verified! Move to step 3.", {
      profile,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// STEP 3 — GST + Bank Details
const completeOnboarding = async (req, res) => {
  try {
    const {
      gstin,
      bankAccount,
      businessAddress,
    } = req.body;

    const profile = await VendorProfile.findOne({ vendor: req.user.id });

    if (!profile) {
      return errorResponse(res, 404, "Complete Step 1 & 2 first");
    }

    profile.gstin = gstin;
    profile.gstVerified = gstin ? true : false;
    profile.bankAccount = bankAccount;
    profile.businessAddress = businessAddress;
    profile.onboardingStep = 4;
    profile.onboardingComplete = true;
    await profile.save();

    // Update user gstin
    await User.findByIdAndUpdate(req.user.id, {
      gstin,
      isVerified: true,
      city: businessAddress.city,
      state: businessAddress.state,
      pincode: businessAddress.pincode,
    });

    return successResponse(res, 200, 
      "🎉 Onboarding complete! Your store is live!", {
      profile,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET VENDOR PROFILE
const getVendorProfile = async (req, res) => {
  try {
    const profile = await VendorProfile.findOne({ vendor: req.user.id })
      .populate("vendor", "name email phone city state");

    if (!profile) {
      return errorResponse(res, 404, "Vendor profile not found");
    }

    return successResponse(res, 200, "Vendor profile fetched!", { profile });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE SUBSCRIPTION
const updateSubscription = async (req, res) => {
  try {
    const { subscriptionTier } = req.body;

    const profile = await VendorProfile.findOne({ vendor: req.user.id });

    if (!profile) {
      return errorResponse(res, 404, "Vendor profile not found");
    }

    profile.subscriptionTier = subscriptionTier;
    await profile.save();

    return successResponse(res, 200, 
      `Subscription updated to ${subscriptionTier}!`, {
      profile,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  verifyAadhar,
  verifyUdyam,
  completeOnboarding,
  getVendorProfile,
  updateSubscription,
};