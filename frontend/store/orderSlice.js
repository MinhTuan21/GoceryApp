import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "http://172.16.50.99:4000/api/orders";

// **Async Thunks** để gọi API
export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) throw new Error("Không thể tạo đơn hàng");
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getOrdersByUser = createAsyncThunk("orders/getOrdersByUser", async (userId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        if (!response.ok) throw new Error("Không thể lấy đơn hàng");
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateOrderStatus = createAsyncThunk("orders/updateOrderStatus", async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error("Không thể cập nhật trạng thái đơn hàng");
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// **Tạo orderSlice**
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {}, // Nếu cần thêm reducer
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrdersByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            });
    },
});

// **Export reducer**
export default orderSlice.reducer;
