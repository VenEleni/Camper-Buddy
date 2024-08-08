const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.googleId; } },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  wishList: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  role: { type: String, enum: ["user", "admin"], default: "user" },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

UserSchema.methods.generateJWT = function() {
  const payload = {
    user: {
      id: this._id,
      role: this.role,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
