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


//@desc     Get all Tasks (Admin : all , Users :only assigned tasks)
//@route    GET /api/tasks/
//@access   Private 
//@desc     Get all Tasks (Admin : all , Users :only assigned tasks)
//@route    GET /api/tasks/
//@access   Private 
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        // Add completed todoChecklist count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed
                ).length;
                return { ...task.toObject(), completedTodoCount: completedCount };
            })
        );

        // Status summary counts
        const baseFilter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };

        const allTasks = await Task.countDocuments(baseFilter);

        const pendingTasks = await Task.countDocuments({
            ...baseFilter,
            status: "Pending"
        });

        const inProgressTasks = await Task.countDocuments({
            ...baseFilter,
            status: "InProgress"
        });

        const completedTasks = await Task.countDocuments({
            ...baseFilter,
            status: "Completed"
        });

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pending: pendingTasks,
                inProgress: inProgressTasks,
                completed: completedTasks
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//@desc     Get Task By Id
//@route    GET /api/tasks/:id
//@access   Private 
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);

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

//@desc     Update Task Details
//@route    PUT /api/tasks
//@access   Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res
                    .status(400)
                    .json({ message: "assignedTo must be an array of IDs" });
            }
            task.assignedTo = req.body.assignedTo;
        }
        const updatedTask = await task.save();
        res.json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//@desc     Delete a task (Admin only)
//@route    DELETE /api/tasks
//@access   Private (Admin)
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        await Task.deleteOne();
        res.json({ message: "Task completed successfully" });
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