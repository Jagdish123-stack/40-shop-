const RFQ = require("../models/RFQ");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Buyer creates RFQ
const createRFQ = async (req, res) => {
  try {
    const {
      productName, category, quantity, unit,
      targetPrice, deliveryCity, deliveryState,
      requiredByDate, description,
    } = req.body;

    const rfq = await RFQ.create({
      buyer: req.user.id,
      productName, category, quantity, unit,
      targetPrice, deliveryCity, deliveryState,
      requiredByDate, description,
    });

    return successResponse(res, 201, "RFQ created successfully!", { rfq });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get all open RFQs (Vendor sees)
const getAllRFQs = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { status: "open" };
    if (category) filter.category = category;

    const rfqs = await RFQ.find(filter)
      .populate("buyer", "name city state")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "RFQs fetched!", {
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Buyer gets own RFQs
const getMyRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.find({ buyer: req.user.id })
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Your RFQs fetched!", {
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Vendor responds with quote
const respondToRFQ = async (req, res) => {
  try {
    const { pricePerUnit, deliveryDays, validUntil, note } = req.body;

    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) return errorResponse(res, 404, "RFQ not found");

    // Check if vendor already responded
    const alreadyResponded = rfq.quotes.find(
      (q) => q.vendor.toString() === req.user.id.toString()
    );
    if (alreadyResponded) {
      return errorResponse(res, 400, "You already responded to this RFQ");
    }

    rfq.quotes.push({
      vendor: req.user.id,
      pricePerUnit,
      deliveryDays,
      validUntil,
      note,
    });

    rfq.status = "responded";
    await rfq.save();

    return successResponse(res, 200, "Quote submitted!", { rfq });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Buyer accepts a quote
const acceptQuote = async (req, res) => {
  try {
    const { quoteId } = req.body;

    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) return errorResponse(res, 404, "RFQ not found");

    if (rfq.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    const quote = rfq.quotes.id(quoteId);
    if (!quote) return errorResponse(res, 404, "Quote not found");

    quote.status = "accepted";
    rfq.status = "accepted";
    await rfq.save();

    return successResponse(res, 200, "Quote accepted!", { rfq });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Close RFQ
const closeRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) return errorResponse(res, 404, "RFQ not found");

    if (rfq.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    rfq.status = "closed";
    await rfq.save();

    return successResponse(res, 200, "RFQ closed!", { rfq });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createRFQ,
  getAllRFQs,
  getMyRFQs,
  respondToRFQ,
  acceptQuote,
  closeRFQ,
};