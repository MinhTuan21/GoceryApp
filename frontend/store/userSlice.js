import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    name: '',
    email: '',
    address: '',
    phone: '',
    avatar: null,
  },
  hasPurchased: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserInfo: (state, action) => {
        state.userInfo = action.payload;
      },
      updateUserInfo: (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      },
      setHasPurchased: (state, action) => {
        state.hasPurchased = action.payload;
      },
      logout: (state) => {
        state.userInfo = initialState.userInfo;
        state.hasPurchased = false;
      },
    },
  });

export const { setUserInfo, updateUserInfo, setHasPurchased, logout } = userSlice.actions;
export default userSlice.reducer;
