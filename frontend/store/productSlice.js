import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../public/src/api/productApi";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await getProducts();
    return response;
});

const productSlice = createSlice({
    name: "products",
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
