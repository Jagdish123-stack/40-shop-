const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  searchProducts, // ← he missing hota
} = require("../controllers/product.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Public routes
router.get("/search", searchProducts);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Vendor only routes
router.post("/", protect, restrictTo("vendor"), createProduct);
router.get("/vendor/my-products", protect, restrictTo("vendor"), getMyProducts);
router.put("/:id", protect, restrictTo("vendor"), updateProduct);
router.delete("/:id", protect, restrictTo("vendor"), deleteProduct);

module.exports = router;