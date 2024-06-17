"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  1234567890: {
    email: "cs@gmail.com",
    password: "Fucklove1*",
    name: "Chaitanya",
    city: "Ujjain",
    phone: "1234567890",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signup: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const usersState = (state) => state.users;
export const { signup: signupUser } = usersSlice.actions;
export default usersSlice;
