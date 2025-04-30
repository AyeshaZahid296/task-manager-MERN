const Task = require("../models/Task");

//@desc     Get all Users (Admin only)
//@route    GET /api/tasks
//@access   Private (Admin)
const getDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


//@desc     Get all Users (Admin only)
//@route    GET /api/tasks
//@access   Private (Admin)
const getUserDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


//@desc     Get all Users (Admin only)
//@route    GET /api/tasks
//@access   Private (Admin)
const getTasks = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};

//@desc     Get all Users (Admin only)
//@route    GET /api/users
//@access   Private (Admin)
const getTaskById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};

//@desc     Create a new task (Admin only)
//@route    POST /api/tasks
//@access   Private (Admin)
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body;

        if (!Array.isArray(assignedTo)) {
            return res
                .status(400)
                .json({ message: "assignedTo must be an array of user IDs " })
        }
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoChecklist,
            attachments,
        })
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};

//@desc     Get all Users (Admin only)
//@route    GET /api/users
//@access   Private (Admin)
const updateTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


//@desc     Get all Users (Admin only)
//@route    GET /api/users
//@access   Private (Admin)
const deleteTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};

//@desc     Get all Users (Admin only)
//@route    GET /api/users
//@access   Private (Admin)
const updateTaskStatus = async (req, res) => {
    try {
        const users = await User.find({ role: "member" }).select("-password");

        const usersWithTaskCounts = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Pending",
                });
                const inProgressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress",
                });
                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });

                return {
                    ...user._doc,
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,
                };
            })
        );

        res.status(200).json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//@desc     Get a specific User by ID.
//@route    GET /api/users/:id
//@access   Private 
const updateTaskChecklist = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist }