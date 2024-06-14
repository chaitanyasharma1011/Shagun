"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

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
