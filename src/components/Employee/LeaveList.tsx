import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateLeaveStatus } from '../../redux/slices/leaveSlice';
import Swal from 'sweetalert2';

const LeaveList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const leaves = useSelector((state: RootState) => state.leave.leaves);
    const calculateLeaveDays = (from: string, to: string): number => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const timeDiff = toDate.getTime() - fromDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    };
    const approvedDays = leaves
        .filter(leave => leave.status === 'Approved')
        .reduce((total, leave) => total + calculateLeaveDays(leave.fromDate, leave.toDate), 0);

    const totalLeaveDays = 30;
    const remainingLeaveDays = totalLeaveDays - approvedDays;

    const handleWithdraw = (id: string) => {
        Swal.fire({
            title: 'Are you sure you want to withdraw this leave?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, withdraw it',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateLeaveStatus({ id, status: 'Withdrawn' }));
                Swal.fire({
                    icon: 'success',
                    title: 'Withdrawn!',
                    text: 'The leave has been withdrawn.',
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <div className="w-[90%] mx-auto bg-gray-100 p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">My Leaves</h2>

            <div className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded font-medium">
                Leave Balance: <span className="font-bold">{remainingLeaveDays}</span> / {totalLeaveDays} Days
            </div>

            {leaves.length === 0 ? (
                <p>No leaves applied yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-2 rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Sr. No.</th>
                                <th className="px-4 py-2">From</th>
                                <th className="px-4 py-2">To</th>
                                <th className="px-4 py-2">Days</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Reason</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave, index) => (
                                <tr key={leave.id} className="text-center">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{leave.fromDate}</td>
                                    <td className="border px-4 py-2">{leave.toDate}</td>
                                    <td className="border px-4 py-2">{calculateLeaveDays(leave.fromDate, leave.toDate)}</td>
                                    <td className="border px-4 py-2">{leave.type}</td>
                                    <td className="border px-4 py-2">{leave.reason}</td>
                                    <td className="border px-4 py-2 font-bold">
                                        {leave.status === 'Withdrawn' ? (
                                            <span className="text-red-500">{leave.status}</span>
                                        ) : (
                                            leave.status
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {leave.status !== 'Withdrawn' && (
                                            <button
                                                onClick={() => handleWithdraw(leave.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Withdraw
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LeaveList;