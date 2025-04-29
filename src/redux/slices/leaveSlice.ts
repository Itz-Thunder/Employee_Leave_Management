import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Leave {
    id: string;
    fromDate: string;
    toDate: string;
    type: string;
    reason: string;
    status: string;
}

interface LeaveState {
    leaves: Leave[];
}

const initialState: LeaveState = {
    leaves: JSON.parse(localStorage.getItem('leaves') || '[]'),
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        applyLeave(state, action: PayloadAction<Leave>) {
            state.leaves.push(action.payload);
            localStorage.setItem('leaves', JSON.stringify(state.leaves));
        },
        updateLeaveStatus(state, action: PayloadAction<{ id: string; status: string }>) {
            const leave = state.leaves.find((l) => l.id === action.payload.id);
            if (leave) {
                leave.status = action.payload.status;
                localStorage.setItem('leaves', JSON.stringify(state.leaves));
            }
        },
        removeLeave(state, action: PayloadAction<string>) {
            state.leaves = state.leaves.filter((leave) => leave.id !== action.payload);
            localStorage.setItem('leaves', JSON.stringify(state.leaves));
        },
    },
});

export const { applyLeave, updateLeaveStatus, removeLeave } = leaveSlice.actions;
export default leaveSlice.reducer;
