const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ─── REGISTER ───────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role, 
            businessName, gstin, city, state, pincode } = req.body;

    // Already exists check
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return errorResponse(res, 400, 
        "Email or phone already registered"
      );
    }

    // User banao
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || "buyer",
      businessName,
      gstin,
      city,
      state,
      pincode,
    });

    // Token generate karo
    const token = generateToken(user._id, user.role);

    return successResponse(res, 201, "Registration successful!", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        state: user.state,
      },
    });

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ─── LOGIN ───────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email aur password dono chahiye
    if (!email || !password) {
      return errorResponse(res, 400, 
        "Email and password required"
      );
    }

    // User dhundho — password bhi lao
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // Password match karo
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const token = generateToken(user._id, user.role);

    return successResponse(res, 200, "Login successful!", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        state: user.state,
      },
    });

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ─── GET PROFILE ─────────────────────────────
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, 200, "Profile fetched!", { user });

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { register, login, getProfile };