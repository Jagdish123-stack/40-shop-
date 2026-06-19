const FlashDeal = require("../models/FlashDeal");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Vendor creates flash deal
const createFlashDeal = async (req, res) => {
  try {
    const {
      productId, dealPrice,
      maxQuantity, startTime, endTime,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) return errorResponse(res, 404, "Product not found");

    if (product.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    const discountPercent = Math.round(
      ((product.price - dealPrice) / product.price) * 100
    );

    const deal = await FlashDeal.create({
      vendor: req.user.id,
      product: productId,
      originalPrice: product.price,
      dealPrice,
      discountPercent,
      maxQuantity,
      startTime,
      endTime,
    });

    return successResponse(res, 201, "Flash deal created!", { deal });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get active flash deals (Public)
const getActiveDeals = async (req, res) => {
  try {
    const now = new Date();

    const deals = await FlashDeal.find({
      isActive: true,
      startTime: { $lte: now },
      endTime: { $gte: now },
      $expr: { $lt: ["$soldQuantity", "$maxQuantity"] },
    })
      .populate("product", "name category unit images")
      .populate("vendor", "name businessName city")
      .sort({ endTime: 1 });

    return successResponse(res, 200, "Active flash deals!", {
      count: deals.length,
      deals,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get vendor's flash deals
const getMyDeals = async (req, res) => {
  try {
    const deals = await FlashDeal.find({ vendor: req.user.id })
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Your flash deals!", {
      count: deals.length,
      deals,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Deactivate flash deal
const deactivateDeal = async (req, res) => {
  try {
    const deal = await FlashDeal.findById(req.params.id);
    if (!deal) return errorResponse(res, 404, "Deal not found");

    if (deal.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    deal.isActive = false;
    await deal.save();

    return successResponse(res, 200, "Deal deactivated!", { deal });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createFlashDeal,
  getActiveDeals,
  getMyDeals,
  deactivateDeal,
};