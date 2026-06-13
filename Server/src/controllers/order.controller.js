const Order = require("../models/Order");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// PLACE ORDER (Buyer only)
const placeOrder = async (req, res) => {
  try {
    const { productId, quantity, deliveryAddress, note } = req.body;

    // Product check
    const product = await Product.findById(productId);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    // MOQ check
    if (quantity < product.moq) {
      return errorResponse(
        res, 400,
        `Minimum order quantity is ${product.moq} ${product.unit}`
      );
    }

    // Stock check
    if (quantity > product.stock) {
      return errorResponse(res, 400, "Insufficient stock");
    }

    const totalAmount = product.price * quantity;

    const order = await Order.create({
      buyer: req.user.id,
      vendor: product.vendor,
      product: productId,
      quantity,
      pricePerUnit: product.price,
      totalAmount,
      deliveryAddress,
      note,
    });

    // Stock update
    await Product.findByIdAndUpdate(productId, {
      $inc: { stock: -quantity },
    });

    const populated = await Order.findById(order._id)
      .populate("product", "name category unit price")
      .populate("vendor", "name businessName city");

    return successResponse(res, 201, "Order placed successfully!", {
      order: populated,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET BUYER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("product", "name category unit price")
      .populate("vendor", "name businessName city")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Your orders fetched!", {
      count: orders.length,
      orders,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET VENDOR ORDERS
const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user.id })
      .populate("product", "name category unit price")
      .populate("buyer", "name phone city")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Vendor orders fetched!", {
      count: orders.length,
      orders,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET SINGLE ORDER
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("product", "name category unit price")
      .populate("vendor", "name businessName city")
      .populate("buyer", "name phone city");

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    // Only buyer or vendor can see
    if (
      order.buyer._id.toString() !== req.user.id.toString() &&
      order.vendor._id.toString() !== req.user.id.toString()
    ) {
      return errorResponse(res, 403, "Not authorized");
    }

    return successResponse(res, 200, "Order fetched!", { order });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE ORDER STATUS (Vendor only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    // Only vendor can update
    if (order.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    order.status = status;

    // Payment release on delivery
    if (status === "delivered") {
      order.paymentStatus = "released";
    }

    await order.save();

    return successResponse(res, 200, "Order status updated!", { order });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// CANCEL ORDER (Buyer only)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    // Only buyer can cancel
    if (order.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    // Can't cancel if dispatched
    if (["dispatched", "delivered"].includes(order.status)) {
      return errorResponse(res, 400, "Cannot cancel — order already dispatched");
    }

    order.status = "cancelled";
    order.paymentStatus = "refunded";
    await order.save();

    // Stock restore
    await Product.findByIdAndUpdate(order.product, {
      $inc: { stock: order.quantity },
    });

    return successResponse(res, 200, "Order cancelled!", { order });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getVendorOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
};