const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

//User Management Routes
router.get("/", protect, adminOnly, getUsers);   //Get all Users (Admin only)
router.get("/:id", protect, getUserById);   //Get a specific User

module.exports = router