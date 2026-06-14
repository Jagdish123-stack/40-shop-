const express = require("express");
const router = express.Router();
const {
  getDashboard,
  getAllUsers,
  getAllVendors,
  approveVendor,
  rejectVendor,
  deleteUser,
} = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// All routes — admin only
router.get("/dashboard", protect, adminOnly, getDashboard);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/vendors", protect, adminOnly, getAllVendors);
router.put("/vendor/:id/approve", protect, adminOnly, approveVendor);
router.put("/vendor/:id/reject", protect, adminOnly, rejectVendor);
router.delete("/user/:id", protect, adminOnly, deleteUser);

module.exports = router;