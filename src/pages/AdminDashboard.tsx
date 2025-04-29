import LeaveRequestList from '../components/Admin/LeaveRequestList';

const AdminDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <LeaveRequestList />
        </div>
    );
};

export default AdminDashboard;
