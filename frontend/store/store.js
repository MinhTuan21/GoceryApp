import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
       
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,

    },
});

