import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    role: string;
}

const initialState: AuthState = {
    role: localStorage.getItem('role') || '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.role = action.payload;
            localStorage.setItem('role', action.payload);
        },
        logout(state) {
            state.role = '';
            localStorage.removeItem('role');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
