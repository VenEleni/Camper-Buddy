const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        cart: {type: Array},
        wishList: {type: Array},
        orders: {type: Array},
        address: {type: String, required: true},
        role: {type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    }
)

const UserModel = mongoose.model("UserModel", User);

module.exports = UserModel;