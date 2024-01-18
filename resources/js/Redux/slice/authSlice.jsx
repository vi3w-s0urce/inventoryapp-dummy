import { createSlice } from "@reduxjs/toolkit";

const authSession = sessionStorage.getItem('auth');
const initialState = authSession ? JSON.parse(authSession) : { user: null, isAdmin: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, isAdmin } = action.payload;
            state.user = user;
            state.isAdmin = isAdmin;
            sessionStorage.setItem('auth', JSON.stringify({ user, isAdmin }))
        },
        logout: (state) => {
            state.user = null;
            state.isAdmin = null;
            sessionStorage.removeItem('auth');
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;