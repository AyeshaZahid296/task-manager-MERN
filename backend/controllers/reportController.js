const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

//@desc     Export All tasks as Excel/PDF
//@route    GET /api/reports/export/tasks
//@access   Private (Admin)
const exportTasksReport = async (req, res) => {
    try {
        const task = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Task Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
        ]

        task.forEach((task) => {
            const assignedTo = task.assignedTo
                .map((user) => `${user.name} (${user.email})`)
                .join(", ");
            worksheet.addRow({

            })
        });


    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//@desc     Export user-Task Report
//@route    GET /api/reports/export/users
//@access   Private (Admin)
const exportUsersReport = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { getUsers, getUserById }