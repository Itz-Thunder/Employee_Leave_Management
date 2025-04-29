import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { applyLeave } from '../../redux/slices/leaveSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface LeaveFormValues {
    fromDate: string;
    noOfDays: string;
    type: string;
    reason: string;
}

const validationSchema = Yup.object({
    fromDate: Yup.string().required('From Date is required'),
    noOfDays: Yup.number().required('Number of Days is required').min(1, 'Must be at least 1 day'),
    type: Yup.string().required('Leave type is required'),
    reason: Yup.string().required('Reason is required'),
});

const ApplyLeaveForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [noOfDays, setNoOfDays] = useState<number | string>('');
    const [toDate, setToDate] = useState<string>('');
    const minDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .then((res) => {
                console.log('Fetched:', res.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);

    const handleSubmit = (
        values: LeaveFormValues,
        { resetForm }: FormikHelpers<LeaveFormValues>
    ) => {
        const newLeave = {
            id: uuidv4(),
            fromDate: values.fromDate,
            toDate: toDate,
            noOfDays: values.noOfDays,
            type: values.type,
            reason: values.reason,
            status: 'Pending',
        };

        dispatch(applyLeave(newLeave));

        Swal.fire({
            icon: 'success',
            title: 'Leave Applied!',
            text: 'Your leave request has been submitted.',
        });

        resetForm();
    };

    const handleFromDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        values: LeaveFormValues
    ) => {
        const fromDate = new Date(e.target.value);
        setToDate('');
        if (values.noOfDays) {
            const calculatedToDate = new Date(fromDate);
            calculatedToDate.setDate(calculatedToDate.getDate() + Number(values.noOfDays) - 1);
            setToDate(calculatedToDate.toISOString().split('T')[0]);
        }
    };

    const handleNoOfDaysChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        values: LeaveFormValues
    ) => {
        setNoOfDays(e.target.value);
        if (values.fromDate && e.target.value) {
            const fromDate = new Date(values.fromDate);
            const calculatedToDate = new Date(fromDate);
            calculatedToDate.setDate(calculatedToDate.getDate() + Number(e.target.value) - 1);
            setToDate(calculatedToDate.toISOString().split('T')[0]);
        }
    };

    return (
        <div className="sm:w-[100%] md:w-[70%] lg:w-[30%] mx-auto bg-gray-100 p-6 shadow-lg rounded-3xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>

            <Formik
                initialValues={{ fromDate: '', noOfDays: '', type: '', reason: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">From Date</label>
                            <Field
                                type="date"
                                name="fromDate"
                                className="w-full border p-2 rounded"
                                min={minDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('fromDate', e.target.value);
                                    handleFromDateChange(e, values);
                                }}
                            />
                            <ErrorMessage name="fromDate" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Number of Days</label>
                            <Field
                                type="number"
                                name="noOfDays"
                                value={noOfDays}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('noOfDays', e.target.value);
                                    handleNoOfDaysChange(e, values);
                                }}
                                className="w-full border p-2 rounded"
                                placeholder="Enter number of days"
                            />
                            <ErrorMessage name="noOfDays" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                readOnly
                                className="w-full border p-2 rounded bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Leave Type</label>
                            <Field
                                type="text"
                                name="type"
                                className="w-full border p-2 rounded"
                                placeholder="e.g. Sick / Casual / Personal"
                            />
                            <ErrorMessage name="type" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Reason</label>
                            <Field
                                as="textarea"
                                name="reason"
                                className="w-full border p-2 rounded"
                                placeholder="State your reason"
                            />
                            <ErrorMessage name="reason" component="div" className="text-red-600 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 mb-4 text-white px-4 py-2 w-full rounded hover:bg-green-600"
                        >
                            Apply
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ApplyLeaveForm;