import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = (role: string) => {
        dispatch(login(role));
        navigate(role === 'employee' ? '/employee' : '/admin');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-semibold mb-8">Employee Leave Management System</h1>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg shadow-lg">
                <button
                    onClick={() => handleLogin('employee')}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Login as Employee
                </button>
                <button
                    onClick={() => handleLogin('admin')}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Login as Admin
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
