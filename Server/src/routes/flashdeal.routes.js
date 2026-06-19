const express = require("express");
const router = express.Router();
const {
  createFlashDeal,
  getActiveDeals,
  getMyDeals,
  deactivateDeal,
} = require("../controllers/flashdeal.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/active", getActiveDeals);
router.post("/", protect, restrictTo("vendor"), createFlashDeal);
router.get("/my-deals", protect, restrictTo("vendor"), getMyDeals);
router.put("/:id/deactivate", protect, restrictTo("vendor"), deactivateDeal);

module.exports = router;