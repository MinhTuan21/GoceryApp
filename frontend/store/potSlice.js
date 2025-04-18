import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPots } from "../public/src/api/potApi";  

export const fetchPots = createAsyncThunk("pots/fetchPots", async () => {
    const response = await getPots();
    return response;
});

const potSlice = createSlice({
    name: "pots",
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPots.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPots.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPots.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default potSlice.reducer;
