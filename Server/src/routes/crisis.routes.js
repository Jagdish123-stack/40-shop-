const express = require("express");
const router = express.Router();
const {
  triggerCrisis,
  getActiveCrisis,
  getAlternateSuppliers,
  resolveCrisis,
} = require("../controllers/crisis.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Public route
router.get("/active", getActiveCrisis);

// Admin only routes
router.post("/trigger", protect, restrictTo("admin"), triggerCrisis);
router.put("/resolve/:id", protect, restrictTo("admin"), resolveCrisis);

// Buyer/Vendor route
router.get(
  "/alternate/:productId/:crisisId",
  protect,
  getAlternateSuppliers
);

module.exports = router;