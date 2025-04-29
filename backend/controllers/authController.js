const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresin: "7d" });
};

//@desc     Register a new user
//@route    POST /api/auth/register
//@access   Public
const registerUser = async (req, res) => { }

//@desc     Login user
//@route    POST /api/auth/login
//@access   Public
const loginUser = async (req, res) => { }

//@desc     Get user profile
//@route    POST /api/auth/profile
//@access   Private (Required JWT)
const getUserProfile = async (req, res) => { }

//@desc     Update user profile
//@route    POST /api/auth/profile
//@access   Private (Required JWT)
const updateUserProfile = async (req, res) => { }

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }