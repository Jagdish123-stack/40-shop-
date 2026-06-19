const express = require("express");
const router = express.Router();
const { generateInvoice } = require("../controllers/invoice.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/:orderId", protect, generateInvoice);

module.exports = router;