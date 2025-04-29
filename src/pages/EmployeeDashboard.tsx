import React from 'react';
import ApplyLeaveForm from '../components/Employee/ApplyLeaveForm';
import LeaveList from '../components/Employee/LeaveList';

const EmployeeDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
            <ApplyLeaveForm />
            <LeaveList />
        </div>
    );
};

export default EmployeeDashboard;
