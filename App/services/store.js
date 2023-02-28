import { configureStore } from "@reduxjs/toolkit";
import { valutApiSlice } from "./api/vaultApiSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [valutApiSlice.reducerPath]: valutApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(valutApiSlice.middleware),
});
