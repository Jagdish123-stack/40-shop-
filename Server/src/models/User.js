const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // password kadhi pan response madhe yet nahi
    },

    role: {
      type: String,
      enum: ["buyer", "vendor", "driver", "admin"],
      default: "buyer",
    },

    // Vendor specific
    businessName: {
      type: String,
      trim: true,
    },

    gstin: {
      type: String,
      trim: true,
    },

    udyamNumber: {
      type: String,
      trim: true,
    },

    // Location
    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    // Account status
    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add hote
  }
);

// Password save karnyapurvi hash karo
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Password compare karne ki method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;