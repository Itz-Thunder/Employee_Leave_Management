import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLeaveStatus } from '../../redux/slices/leaveSlice';
import { RootState, AppDispatch } from '../../redux/store';
import Swal from 'sweetalert2';
import axios from 'axios';

const LeaveRequestList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const leaves = useSelector((state: RootState) => state.leave.leaves);
    const calculateLeaveDays = (from: string, to: string): number => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const timeDiff = toDate.getTime() - fromDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    };
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then((res) => {
                console.log('Fetched:', res.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);

    const confirmAndHandle = (id: string, status: 'Approved' | 'Rejected') => {
        Swal.fire({
            title: `Are you sure you want to ${status.toLowerCase()} this leave?`,
            icon: status === 'Approved' ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'Approved' ? '#10B981' : '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: `Yes, ${status.toLowerCase()} it`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateLeaveStatus({ id, status }));
                Swal.fire({
                    icon: 'success',
                    title: `Leave ${status}`,
                    text: `The leave has been ${status.toLowerCase()}.`,
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <div className="p-6 bg-gray-100 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>

            {leaves.length === 0 ? (
                <p>No leave requests yet.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Sr. no.</th>
                            <th className="px-4 py-2">Employee Name</th>
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
                                <td className="border px-4 py-2">Dummy Employee</td>
                                <td className="border px-4 py-2">{leave.fromDate}</td>
                                <td className="border px-4 py-2">{leave.toDate}</td>
                                <td className="border px-4 py-2">{calculateLeaveDays(leave.fromDate, leave.toDate)}</td>
                                <td className="border px-4 py-2">{leave.type}</td>
                                <td className="border px-4 py-2">{leave.reason}</td>
                                <td className="border px-4 py-2 font-bold">{leave.status}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    {leave.status === 'Pending' ? (
                                        <>
                                            <button
                                                onClick={() => confirmAndHandle(leave.id, 'Approved')}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => confirmAndHandle(leave.id, 'Rejected')}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 italic font-bold">No action</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LeaveRequestList;
