const express = require("express");
const router = express.Router();
const { getRates, bookShipment } = require("../controllers/logistics.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/rates", protect, getRates);
router.post("/book", protect, restrictTo("vendor"), bookShipment);

module.exports = router;