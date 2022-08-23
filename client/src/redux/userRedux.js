import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
        },
        register: (state, action) => {
            state.user = action.payload.user
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
});

export const { login, register, logout, setUser } = userSlice.actions;

export default userSlice.reducer;