export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        Register: "/api/auth/register", // Register a new user (Admin or Member)
        LOGIN: "/api/auth/login", // Authenticate user & return JWT tocken
        GET_PROFILE: "/api/auth/profile", // Get logged-in uder details
    },

    USERS: {
        GET_ALL_USERS: "/api/users",// Get all users (Admin only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
        CREATE_USER: "/api/users", //Create a new user (Admin only)
        UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user details 
        DELETE_USER: (userId) => `/api/users/${userId}`, // Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",// Get Dashboard Data 
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", // Get user Dashboard Data 
        GET_ALL_TASKS: "/api/tasks", //Create all tasks (Admin: all, User: only assigned tasks)
        GET_ALL_TASKS_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by ID
        CREATE_TASKS: "/api/tasks", //Create a new task (Admin only)
        UPDATE_TASKS: (taskId) => `/api/tasks/${taskId}`, // Update task details 
        DELETE_TASKS: (taskId) => `/api/tasks/${taskId}`, // Delete a task (Admin only) 

        UPDATE_TASKS_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status 
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update task checklist 
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/exports/tasks",// Download all tasks as an Excel
        EXPORT_USERS: "/api/reports/exports/users", // Download user-task report 
    },

    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    },
};