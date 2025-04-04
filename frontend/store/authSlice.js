import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../public/src/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await authApi.login(userData.email, userData.password);
        if (response.token) {
            await AsyncStorage.setItem("token", response.token);
            return response;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
