const express = require("express");
const router = express.Router();
const {
  createRFQ, getAllRFQs, getMyRFQs,
  respondToRFQ, acceptQuote, closeRFQ,
} = require("../controllers/rfq.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.post("/", protect, restrictTo("buyer"), createRFQ);
router.get("/", protect, restrictTo("vendor"), getAllRFQs);
router.get("/my-rfqs", protect, restrictTo("buyer"), getMyRFQs);
router.post("/:id/respond", protect, restrictTo("vendor"), respondToRFQ);
router.put("/:id/accept-quote", protect, restrictTo("buyer"), acceptQuote);
router.put("/:id/close", protect, restrictTo("buyer"), closeRFQ);

module.exports = router;