"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    add: (state, action) => [...state, { ...action.payload }],
    update: (state, action) => [...action.payload],
  },
});

export const eventsState = (state) => state.events;
export const { add: addEvents, update: updateEvents } = eventsSlice.actions;
export default eventsSlice;
