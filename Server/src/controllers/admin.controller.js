const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// DASHBOARD
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "buyer" });
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    const recentOrders = await Order.find()
      .populate("buyer", "name email")
      .populate("product", "name price")
      .sort({ createdAt: -1 })
      .limit(5);

    const revenue = await Payment.aggregate([
      { $match: { status: "released" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return successResponse(res, 200, "Dashboard fetched!", {
      stats: {
        totalUsers,
        totalVendors,
        totalProducts,
        totalOrders,
        totalRevenue: revenue[0]?.total || 0,
      },
      recentOrders,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "buyer" })
      .select("-password")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Users fetched!", {
      count: users.length,
      users,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL VENDORS
const getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" })
      .select("-password")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Vendors fetched!", {
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// APPROVE VENDOR
const approveVendor = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return errorResponse(res, 404, "Vendor not found");
    }

    if (vendor.role !== "vendor") {
      return errorResponse(res, 400, "User is not a vendor");
    }

    vendor.isVerified = true;
    await vendor.save();

    return successResponse(res, 200, "Vendor approved!", { vendor });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// REJECT VENDOR
const rejectVendor = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return errorResponse(res, 404, "Vendor not found");
    }

    vendor.isVerified = false;
    vendor.isActive = false;
    await vendor.save();

    return successResponse(res, 200, "Vendor rejected!", { vendor });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user.role === "admin") {
      return errorResponse(res, 400, "Cannot delete admin user");
    }

    await User.findByIdAndDelete(req.params.id);

    return successResponse(res, 200, "User deleted!", {});
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  getDashboard,
  getAllUsers,
  getAllVendors,
  approveVendor,
  rejectVendor,
  deleteUser,
};