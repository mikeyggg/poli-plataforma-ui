import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Option2Glassmorphism from './option2/Option2_Glassmorphism.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/dashboard" element={<Option2Glassmorphism />} />
        <Route path="/teacher"   element={<TeacherDashboard />} />
        <Route path="/"          element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
