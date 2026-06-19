const { 
  optimizeListing, 
  processSearchQuery, 
  predictDemand,
  identifyProductFromImage 
} = require("../services/ai.service");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// AI LISTING OPTIMIZER (Vendor)
const optimizeProductListing = async (req, res) => {
  try {
    const { name, description, category, price, unit } = req.body;

    if (!name || !category || !price) {
      return errorResponse(res, 400, "Name, category and price required");
    }

    const optimized = await optimizeListing({
      name, description, category, price, unit
    });

    return successResponse(res, 200, "Listing optimized!", { optimized });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// VERNACULAR SEARCH ASSISTANT (Buyer)
const vernacularSearch = async (req, res) => {
  try {
    const { query, language } = req.body;

    if (!query) {
      return errorResponse(res, 400, "Search query required");
    }

    // AI se intent extract karo
    const intent = await processSearchQuery(query, language || "hindi");

    // Products search karo
    let products = [];
    if (intent.keyword) {
      const filter = { isActive: true };

      filter.$or = [
        { name: { $regex: intent.keyword, $options: "i" } },
        { description: { $regex: intent.keyword, $options: "i" } },
      ];

      if (intent.category) filter.category = intent.category;
      if (intent.location) {
        filter.$or.push(
          { city: { $regex: intent.location, $options: "i" } },
          { state: { $regex: intent.location, $options: "i" } }
        );
      }

      products = await Product.find(filter)
        .populate("vendor", "name businessName city state isVerified")
        .limit(10);
    }

    return successResponse(res, 200, "Search results!", {
      intent,
      responseMessage: intent.responseMessage,
      productsFound: products.length,
      products,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DEMAND PREDICTION (Vendor)
const getDemandPrediction = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    // Only vendor can see their product prediction
    if (product.vendor.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "Not authorized");
    }

    const prediction = await predictDemand(product.name, product.category);

    return successResponse(res, 200, "Demand prediction fetched!", {
      product: product.name,
      category: product.category,
      prediction,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// PHOTO TO PRODUCT SEARCH (Buyer)
const photoSearch = async (req, res) => {
  try {
    const { base64Image, mimeType } = req.body;

    if (!base64Image) {
      return errorResponse(res, 400, "Image required");
    }

    // AI se product identify karo
    const identified = await identifyProductFromImage(
      base64Image,
      mimeType || "image/jpeg"
    );

    // Products search karo
    let products = [];
    if (identified.searchKeyword) {
      products = await Product.find({
        isActive: true,
        $or: [
          { name: { $regex: identified.searchKeyword, $options: "i" } },
          { description: { $regex: identified.searchKeyword, $options: "i" } },
          { category: identified.category },
        ],
      })
        .populate("vendor", "name businessName city state isVerified")
        .limit(10);
    }

    return successResponse(res, 200, "Photo search results!", {
      identified,
      productsFound: products.length,
      products,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  optimizeProductListing,
  vernacularSearch,
  getDemandPrediction,
  photoSearch,
};