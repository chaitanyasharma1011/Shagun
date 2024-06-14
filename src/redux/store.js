"use client";

import { configureStore } from "@reduxjs/toolkit";

// import userSlice from "./slices/user/userSlice";
import notificationSlice from "./slices/notificationSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import usersSlice from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const returnableMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["notification/show", "notification/hide"],
        ignoredPaths: ["notification"],
      },
    });
    // if (apiInvestEdgeSlice)
    //   returnableMiddleware.concat(apiInvestEdgeSlice.middleware);
    return returnableMiddleware;
  },
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
