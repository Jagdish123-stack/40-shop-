const Order = require("../models/Order");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("buyer", "name email phone gstin city state")
      .populate("vendor", "name businessName gstin city state")
      .populate("product", "name category price unit");

    if (!order) return errorResponse(res, 404, "Order not found");

    const gstRate = 18;
    const subtotal = order.totalAmount;
    const gstAmount = (subtotal * gstRate) / 100;
    const grandTotal = subtotal + gstAmount;

    const invoice = {
      invoiceNumber: `INV-${order._id.toString().slice(-8).toUpperCase()}`,
      invoiceDate: new Date().toISOString(),
      irnNumber: `IRN-${Date.now()}`,

      seller: {
        name: order.vendor.businessName || order.vendor.name,
        gstin: order.vendor.gstin || "N/A",
        address: `${order.vendor.city}, ${order.vendor.state}`,
      },

      buyer: {
        name: order.buyer.name,
        gstin: order.buyer.gstin || "N/A",
        address: order.deliveryAddress?.fullAddress ||
          `${order.deliveryAddress?.city}, ${order.deliveryAddress?.state}`,
      },

      items: [
        {
          productName: order.product.name,
          hsnCode: "10063020",
          quantity: order.quantity,
          unit: order.product.unit,
          pricePerUnit: order.pricePerUnit,
          totalAmount: order.totalAmount,
          gstRate: `${gstRate}%`,
          gstAmount: gstAmount.toFixed(2),
        },
      ],

      summary: {
        subtotal: subtotal.toFixed(2),
        cgst: (gstAmount / 2).toFixed(2),
        sgst: (gstAmount / 2).toFixed(2),
        grandTotal: grandTotal.toFixed(2),
      },

      itcEligible: true,
      platform: "40shops",
    };

    return successResponse(res, 200, "Invoice generated!", { invoice });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { generateInvoice };