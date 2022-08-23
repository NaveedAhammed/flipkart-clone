import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
    name: "fetch",
    initialState: {
        loading: false
    },
    reducers: {
        fetchingStart: (state) => {
            state.loading = true
        },
        fetchingEnd: (state) => {
            state.loading = false;
        }
    }
});

export const { fetchingStart, fetchingEnd } = fetchSlice.actions;

export default fetchSlice.reducer;