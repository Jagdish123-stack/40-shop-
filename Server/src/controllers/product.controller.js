const Product = require("../models/Product");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// CREATE PRODUCT (Vendor only)
const createProduct = async (req, res) => {
  try {
    const {
      name, description, category,
      price, unit, moq, stock, city, state
    } = req.body;

    const product = await Product.create({
      vendor: req.user.id,
      name, description, category,
      price, unit, moq, stock, city, state
    });

    return successResponse(res, 201, "Product created!", { product });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL PRODUCTS (Buyer - with filters)
const getAllProducts = async (req, res) => {
  try {
    const { category, city, minPrice, maxPrice, search } = req.query;

    let filter = { isActive: true };

    if (category) filter.category = category;
    if (city) filter.city = city;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter)
      .populate("vendor", "name businessName city state")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Products fetched!", {
      count: products.length,
      products,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "name businessName city state phone");

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    return successResponse(res, 200, "Product fetched!", { product });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET VENDOR'S OWN PRODUCTS
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id })
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Your products fetched!", {
      count: products.length,
      products,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE PRODUCT (Vendor only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    if (product.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized to update this product");
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return successResponse(res, 200, "Product updated!", { product: updated });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE PRODUCT (Vendor only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    if (product.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized to delete this product");
    }

    await Product.findByIdAndDelete(req.params.id);

    return successResponse(res, 200, "Product deleted!", {});
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// SEARCH & FILTERS
const searchProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      city,
      state,
      verifiedVendor,
      page = 1,
      limit = 10,
      sortBy,
    } = req.query;

    let filter = { isActive: true };

    // Keyword search
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Category filter
    if (category) filter.category = category;

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Location filter
    if (city) filter.city = { $regex: city, $options: "i" };
    if (state) filter.state = { $regex: state, $options: "i" };

    // Verified vendor filter
    if (verifiedVendor === "true") {
      const verifiedVendors = await User.find({
        role: "vendor",
        isVerified: true,
      }).select("_id");

      const vendorIds = verifiedVendors.map((v) => v._id);
      filter.vendor = { $in: vendorIds };
    }

    // Sorting
    let sort = { createdAt: -1 };
    if (sortBy === "newest") sort = { createdAt: -1 };
    if (sortBy === "price_low") sort = { price: 1 };
    if (sortBy === "price_high") sort = { price: -1 };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("vendor", "name businessName city state isVerified")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    return successResponse(res, 200, "Search results!", {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
};