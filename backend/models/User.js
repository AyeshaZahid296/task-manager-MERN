const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, requird: true },
        email: { type: String, requird: true },
        password: { type: String, requird: true },
        profileImageUrl: { type: String, default: null },
        role: { type: String, enum: ["admin", "member"], default: "member" },//Role based access
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);