const express = require("express");
const router = express.Router();
const {
  initiatePayment,
  releasePayment,
  refundPayment,
  freezePayment,
  getPaymentStatus,
} = require("../controllers/payment.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Buyer routes
router.post("/initiate", protect, restrictTo("buyer"), initiatePayment);
router.put("/release/:id", protect, restrictTo("buyer"), releasePayment);
router.put("/refund/:id", protect, restrictTo("buyer"), refundPayment);

// Admin route (crisis freeze)
router.put("/freeze/:id", protect, restrictTo("admin"), freezePayment);

// Common
router.get("/:id", protect, getPaymentStatus);

module.exports = router;