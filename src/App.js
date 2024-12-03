import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetails from './pages/TaskDetails';

const App = () => {
  return (
    <Routes>
      {/* Redirect root path to /tasks */}
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TaskDashboard />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
    </Routes>
  );
}

export default App;
