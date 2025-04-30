const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router = express.Router();

//User Management Routes
router.get("/dashboard-data", protect, getDashboardData);   //Get Dashboard Data
router.get("/user-dashboard-data", protect, getUserDashboardData);   //Get User Dashboard Data
router.get("/", protect, getTasks);   //Get all Tasks (Admin : all , Users :assigned)
router.get("/:id", protect, getTaskById);   //Get Task By Id
router.post("/", protect, adminOnly, createTask);   //Create Task (Admin only)
router.put("/:id", protect, updateTask);   //Update Task Details
router.delete("/:id", protect, adminOnly, deleteTask);   //Delete a Task (Admin only)
router.put("/:id/status", protect, updateTaskStatus);   //Update Task Status
router.put("/:id/todo", protect, updateTaskChecklist);   //Update Task Checklist

module.exports = router