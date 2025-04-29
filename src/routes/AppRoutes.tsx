import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoginPage from '../pages/LoginPage';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
    const { role } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            {role === 'employee' && <Route path="/employee" element={<EmployeeDashboard />} />}
            {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
