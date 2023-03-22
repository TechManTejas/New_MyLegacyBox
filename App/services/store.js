import { configureStore } from "@reduxjs/toolkit";
import { vaultApiSlice } from "./api/vaultApiSlice";
import { nomineeApiSlice } from "./api/nomineeApiSlice";
import { feedbackApiSlice } from "./api/feedbackApiSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [vaultApiSlice.reducerPath]: vaultApiSlice.reducer,
    [nomineeApiSlice.reducerPath]: nomineeApiSlice.reducer,
    [feedbackApiSlice.reducerPath]: feedbackApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vaultApiSlice.middleware)
      .concat(nomineeApiSlice.middleware)
      .concat(feedbackApiSlice.middleware),
});
