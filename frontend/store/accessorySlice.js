import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessories } from "../public/src/api/accessoryApi"; 

export const fetchAccessories = createAsyncThunk("accessories/fetchAccessories", async () => {
    const response = await getAccessories();
    return response;
});

const accessorySlice = createSlice({
    name: "accessories",
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAccessories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAccessories.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default accessorySlice.reducer;
