const { getLogisticsRates, bookLogistics } = require("../services/logistics.service");
const Order = require("../models/Order");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const getRates = async (req, res) => {
  try {
    const { fromCity, toCity, weight } = req.query;

    if (!fromCity || !toCity || !weight) {
      return errorResponse(res, 400, "fromCity, toCity, weight required");
    }

    const rates = await getLogisticsRates(fromCity, toCity, Number(weight));

    return successResponse(res, 200, "Logistics rates fetched!", { rates });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const bookShipment = async (req, res) => {
  try {
    const { orderId, courierName } = req.body;

    const order = await Order.findById(orderId)
      .populate("product", "name")
      .populate("buyer", "name city")
      .populate("vendor", "name city");

    if (!order) return errorResponse(res, 404, "Order not found");

    if (order.vendor._id.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    const booking = await bookLogistics(courierName, {
      from: order.vendor.city,
      to: order.deliveryAddress?.city,
      product: order.product.name,
      quantity: order.quantity,
    });

    // Update order status
    await Order.findByIdAndUpdate(orderId, { status: "dispatched" });

    return successResponse(res, 200, "Shipment booked!", { booking });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { getRates, bookShipment };