const Crisis = require("../models/Crisis");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// TRIGGER CRISIS (Admin only)
const triggerCrisis = async (req, res) => {
  try {
    const { title, description, affectedRegions, severity } = req.body;

    const crisis = await Crisis.create({
      title,
      description,
      affectedRegions,
      severity,
      triggeredBy: req.user.id,
    });

    // Find affected vendors in crisis zone
    const affectedCities = affectedRegions.map((r) => r.city);
    const affectedVendors = await User.find({
      role: "vendor",
      city: { $in: affectedCities },
    });

    const vendorIds = affectedVendors.map((v) => v._id);

    // Find active orders of affected vendors
    const affectedOrders = await Order.find({
      vendor: { $in: vendorIds },
      status: { $in: ["pending", "accepted", "packed"] },
    });

    const orderIds = affectedOrders.map((o) => o._id);

    // Freeze payments of affected orders
    await Payment.updateMany(
      { order: { $in: orderIds } },
      {
        escrowFrozen: true,
        status: "frozen",
        frozenReason: `Crisis: ${title}`,
      }
    );

    return successResponse(res, 201, "Crisis triggered!", {
      crisis,
      affectedVendors: affectedVendors.length,
      affectedOrders: affectedOrders.length,
      paymentsFrozen: orderIds.length,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL ACTIVE CRISIS
const getActiveCrisis = async (req, res) => {
  try {
    const crises = await Crisis.find({ isActive: true })
      .populate("triggeredBy", "name email")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Active crises fetched!", {
      count: crises.length,
      crises,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALTERNATE SUPPLIERS (Auto match)
const getAlternateSuppliers = async (req, res) => {
  try {
    const { productId, crisisId } = req.params;

    const crisis = await Crisis.findById(crisisId);
    if (!crisis) {
      return errorResponse(res, 404, "Crisis not found");
    }

    const affectedCities = crisis.affectedRegions.map((r) => r.city);

    // Find original product
    const product = await Product.findById(productId);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    // Find same category products from unaffected vendors
    const alternateProducts = await Product.find({
      category: product.category,
      city: { $nin: affectedCities },
      isActive: true,
      _id: { $ne: productId },
    })
      .populate("vendor", "name businessName city state isVerified")
      .limit(5);

    return successResponse(res, 200, "Alternate suppliers found!", {
      count: alternateProducts.length,
      originalProduct: product.name,
      alternateProducts,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// RESOLVE CRISIS (Admin only)
const resolveCrisis = async (req, res) => {
  try {
    const crisis = await Crisis.findById(req.params.id);

    if (!crisis) {
      return errorResponse(res, 404, "Crisis not found");
    }

    crisis.isActive = false;
    crisis.resolvedAt = new Date();
    await crisis.save();

    // Unfreeze payments
    const affectedCities = crisis.affectedRegions.map((r) => r.city);
    const affectedVendors = await User.find({
      role: "vendor",
      city: { $in: affectedCities },
    });

    const vendorIds = affectedVendors.map((v) => v._id);
    const affectedOrders = await Order.find({
      vendor: { $in: vendorIds },
    });

    const orderIds = affectedOrders.map((o) => o._id);

    await Payment.updateMany(
      { order: { $in: orderIds }, escrowFrozen: true },
      {
        escrowFrozen: false,
        status: "held",
        frozenReason: "",
      }
    );

    return successResponse(res, 200, "Crisis resolved! Payments unfrozen!", {
      crisis,
      paymentsUnfrozen: orderIds.length,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  triggerCrisis,
  getActiveCrisis,
  getAlternateSuppliers,
  resolveCrisis,
};