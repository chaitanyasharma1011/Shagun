"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  1234567890: {
    email: "cs@gmail.com",
    password: "qwertyuiop",
    name: "Chaitanya",
    city: "Ujjain",
    phone: "1234567890",
  },
  8319299423: {
    email: "chaitanya@gmail.com",
    password: "qwertyuiop1",
    name: "Cs",
    city: "Nagda",
    phone: "8319299423",
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
