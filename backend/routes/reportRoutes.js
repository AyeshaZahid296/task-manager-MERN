const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");

const router = express.Router();

//Report Export Routes
router.get("/export/tasks", protect, adminOnly, exportTasksReport);   // Export All tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport);   // Export user-Task Report

module.exports = router