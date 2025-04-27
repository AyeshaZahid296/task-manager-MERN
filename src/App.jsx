import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register } from './pages/Auth';
import { ManageUsers, CreateTask, ManageTasks, Dashboard } from './pages/Admin';
import { UserDashboard, MyTasks } from './pages/User';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/tasks" element={<ManageTasks />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>
        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/user/user-dashboard" element={<UserDashboard />} />
          <Route path="/user/my-tasks" element={<MyTasks />} />
          <Route path="/user/tasks-details/:id" element={<ViewTaskDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
