const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getVendorOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Buyer routes
router.post("/", protect, restrictTo("buyer"), placeOrder);
router.get("/my-orders", protect, restrictTo("buyer"), getMyOrders);
router.put("/cancel/:id", protect, restrictTo("buyer"), cancelOrder);

// Vendor routes
router.get("/vendor-orders", protect, restrictTo("vendor"), getVendorOrders);
router.put("/status/:id", protect, restrictTo("vendor"), updateOrderStatus);

// Common (buyer + vendor both)
router.get("/:id", protect, getOrder);

module.exports = router;