import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";
import potReducer from "./potSlice"
import accessoryReducer from "./accessorySlice"
import notificationReducer from "./notificationSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
       user: userReducer, //profile
        auth: authReducer, // login
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,//
         pots: potReducer,
         accessories: accessoryReducer,
         notifications: notificationReducer,

    },
});

