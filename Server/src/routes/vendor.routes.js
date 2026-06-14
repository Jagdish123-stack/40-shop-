const express = require("express");
const router = express.Router();
const {
  verifyAadhar,
  verifyUdyam,
  completeOnboarding,
  getVendorProfile,
  updateSubscription,
} = require("../controllers/vendor.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// All vendor only routes
router.post(
  "/onboarding/step1",
  protect,
  restrictTo("vendor"),
  verifyAadhar
);
router.post(
  "/onboarding/step2",
  protect,
  restrictTo("vendor"),
  verifyUdyam
);
router.post(
  "/onboarding/step3",
  protect,
  restrictTo("vendor"),
  completeOnboarding
);
router.get(
  "/profile",
  protect,
  restrictTo("vendor"),
  getVendorProfile
);
router.put(
  "/subscription",
  protect,
  restrictTo("vendor"),
  updateSubscription
);

module.exports = router;