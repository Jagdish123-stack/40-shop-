const express = require("express");
const router = express.Router();
const {
  optimizeProductListing,
  vernacularSearch,
  getDemandPrediction,
  photoSearch, 
} = require("../controllers/ai.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Buyer routes
router.post("/search", vernacularSearch);
router.post("/photo-search", photoSearch); 

// Vendor routes
router.post(
  "/optimize-listing",
  protect,
  restrictTo("vendor"),
  optimizeProductListing
);
router.get(
  "/demand/:productId",
  protect,
  restrictTo("vendor"),
  getDemandPrediction
);

module.exports = router;