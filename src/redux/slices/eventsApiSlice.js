"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    update: (state, action) => [...state, ...action.payload],
  },
});

export const eventsState = (state) => state.events;
export const { update: updateEvents } = eventsSlice.actions;
export default eventsSlice;
