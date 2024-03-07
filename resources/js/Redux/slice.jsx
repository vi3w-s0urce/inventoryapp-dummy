import { createSlice } from "@reduxjs/toolkit";

const authSession = sessionStorage.getItem('auth');
const darkModeSession = sessionStorage.getItem('darkMode');
const initialStateAuth = authSession ? JSON.parse(authSession) : { user: null, isAdmin: null };
const initialStateDarkMode = darkModeSession ? JSON.parse(darkModeSession) : false;


const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
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

const currentRouteSlice = createSlice({
    name: 'currentRoute',
    initialState: { route: null, subRoute: null },
    reducers: {
        setCurrentRoute: (state, action) => {
            return action.payload;
        }
    }
});

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: initialStateDarkMode,
    reducers: {
        setDarkMode: (state, action) => {
            sessionStorage.setItem('darkMode', JSON.stringify(action.payload));
            return action.payload;
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export const { setCurrentRoute } = currentRouteSlice.actions;
export const { setDarkMode } = darkModeSlice.actions;
export const authReducer = authSlice.reducer;
export const currentRouteReducer = currentRouteSlice.reducer;
export const darkModeReducer = darkModeSlice.reducer;

export const rootReducer = {
    auth: authReducer,
    currentRoute: currentRouteReducer,
    darkMode: darkModeReducer,
};