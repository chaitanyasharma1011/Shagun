"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  severity: "info",
  message: "",
  open: false,
  autoHideDuration: 6000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  icon: null,
  variant: "standard",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action) => ({
      ...state,
      ...action.payload,
      open: true,
    }),
    hide: (state) => ({
      ...state,
      open: false,
    }),
    remove: () => initialState,
  },
});

export const notificationState = (state) => state.notification;
export const {
  show: showNotification,
  hide: hideNotification,
  remove: removeNotification,
} = notificationSlice.actions;
export default notificationSlice;
