"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "cs@gmail.com",
  password: "Fucklove1*",
  name: "Chaitanya",
  city: "Ujjain",
  phone: "1234567890",
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    login: (state, action) => ({
      ...action.payload,
    }),
    logout: () => initialState,
  },
});

export const loggedInUserState = (state) => state.loggedInUser;
export const { login: loginUser, logout: logoutUser } =
  loggedInUserSlice.actions;
export default loggedInUserSlice;
