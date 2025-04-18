import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: nextId++,
        message: action.payload.message,
        timestamp: new Date().toLocaleString(),
        image: action.payload.image,
      };
      state.unshift(newNotification);
    },
    clearNotifications: () => [],
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
