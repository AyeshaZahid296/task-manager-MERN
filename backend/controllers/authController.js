const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//@desc     Register a new user
//@route    POST /api/auth/register
//@access   Public
const registerUser = async (req, res) => {
    try { } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc     Login user
//@route    POST /api/auth/login
//@access   Public
const loginUser = async (req, res) => {
    try { } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc     Get user profile
//@route    POST /api/auth/profile
//@access   Private (Required JWT)
const getUserProfile = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } =
            req.body;

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
        }

        //Determine user role : Admin if correct token is provided, otherwise Member
        let role = "member";
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            adminInviteToken
        });

        //Retrun user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc     Update user profile
//@route    POST /api/auth/profile
//@access   Private (Required JWT)
const updateUserProfile = async (req, res) => {
    try { } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }