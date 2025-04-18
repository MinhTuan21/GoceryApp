import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalItems: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
          
            if (existingItem) {
              existingItem.quantity += newItem.quantity;
            } else {
              state.items.push({ ...newItem });
            }
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
          },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                state.totalItems -= item.quantity;
                state.items = state.items.filter(item => item._id !== id);
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart, 
} = cartSlice.actions;

export default cartSlice.reducer;
