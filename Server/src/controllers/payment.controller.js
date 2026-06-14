const Payment = require("../models/Payment");
const Order = require("../models/Order");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// INITIATE PAYMENT (Buyer - after placing order)
const initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    // Only buyer can pay
    if (order.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    // Already paid check
    const existing = await Payment.findOne({ order: orderId });
    if (existing) {
      return errorResponse(res, 400, "Payment already initiated");
    }

    const payment = await Payment.create({
      order: orderId,
      buyer: req.user.id,
      vendor: order.vendor,
      amount: order.totalAmount,
      status: "held",
    });

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "held",
    });

    return successResponse(res, 201, "Payment held in escrow!", { payment });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// RELEASE PAYMENT (Buyer - after delivery confirmed)
const releasePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    // Only buyer can release
    if (payment.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    // Frozen check
    if (payment.escrowFrozen) {
      return errorResponse(res, 400, 
        "Payment is frozen due to crisis — cannot release"
      );
    }

    payment.status = "released";
    payment.releasedAt = new Date();
    await payment.save();

    // Update order
    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "released",
      status: "delivered",
    });

    return successResponse(res, 200, "Payment released to vendor!", { payment });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// REFUND PAYMENT (On order cancellation)
const refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    // Only buyer can request refund
    if (payment.buyer.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    if (payment.status === "released") {
      return errorResponse(res, 400, "Payment already released — cannot refund");
    }

    payment.status = "refunded";
    payment.refundedAt = new Date();
    await payment.save();

    // Update order
    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "refunded",
      status: "cancelled",
    });

    return successResponse(res, 200, "Payment refunded!", { payment });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// FREEZE PAYMENT (Crisis mode)
const freezePayment = async (req, res) => {
  try {
    const { reason } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    payment.escrowFrozen = true;
    payment.frozenReason = reason || "Crisis alert in supplier region";
    payment.status = "frozen";
    await payment.save();

    // Update order
    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "held",
    });

    return successResponse(res, 200, "Payment frozen — escrow protected!", {
      payment,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET PAYMENT STATUS
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("order", "totalAmount status")
      .populate("buyer", "name email")
      .populate("vendor", "name businessName");

    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    return successResponse(res, 200, "Payment fetched!", { payment });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  initiatePayment,
  releasePayment,
  refundPayment,
  freezePayment,
  getPaymentStatus,
};