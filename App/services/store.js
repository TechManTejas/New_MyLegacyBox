import { compose, configureStore } from "@reduxjs/toolkit";
import { vaultApiSlice } from "./api/vaultApiSlice";
import { nomineeApiSlice } from "./api/nomineeApiSlice";
import { feedbackApiSlice } from "./api/feedbackApiSlice";
import { willApiSlice } from "./api/willApiSlice";
import authReducer from "./auth/authSlice";
import willFormReducer from "./willForm/willFormSlice";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    willForm: willFormReducer,
    [vaultApiSlice.reducerPath]: vaultApiSlice.reducer,
    [nomineeApiSlice.reducerPath]: nomineeApiSlice.reducer,
    [feedbackApiSlice.reducerPath]: feedbackApiSlice.reducer,
    [willApiSlice.reducerPath]: willApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vaultApiSlice.middleware)
      .concat(nomineeApiSlice.middleware)
      .concat(feedbackApiSlice.middleware)
      .concat(willApiSlice.middleware),
  // enhancers: composeEnhancers,
});
