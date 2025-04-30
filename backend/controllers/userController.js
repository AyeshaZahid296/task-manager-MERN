const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc     Get all Users (Admin only)
//@route    GET /api/users
//@access   Private (Admin)
const getUsers = async (req, res) => {
    try {
        const user = await User.find({ role: "member" }).select("password");

        //Add taks coun to each user
        const usersWithTaskCounts = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Tasks.countDocuments({
                    assignedTo: user._id,
                    status: "Pending",
                });
                const inProgressTasks = await Tasks.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress",
                });
                const completedTasks = await Tasks.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });

                return {
                    ...user._doc, // Include all existing user data
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,

                };
            })
        );


    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc     Get a specific User by ID
//@route    GET /api/users/:id
//@access   Private 
const getUserById = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // Return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc     Delete a User (Admin only)
//@route    DELETE /api/users/:id
//@access   Private (Admin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { getUsers, getUserById, deleteUser }