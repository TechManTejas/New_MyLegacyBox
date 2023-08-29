import {  configureStore } from "@reduxjs/toolkit";
import { vaultApiSlice } from "./api/vaultApiSlice";
import { nomineeApiSlice } from "./api/nomineeApiSlice";
import { feedbackApiSlice } from "./api/feedbackApiSlice";
import { willApiSlice } from "./api/willApiSlice";
import authReducer from "./auth/authSlice";
import willFormReducer from "./willForm/willFormSlice";
import { sharedArtifactApiSlice } from "./api/sharedArtifactApiSlice";
import tooltipMessageReducer from "./tooltipMessage/tooltipMessage";
import { personalInfoApiSlice } from "./api/personalInfoApiSlice";
import appTourReducer from "./appTour/appTour";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    willForm: willFormReducer,
    tooltipMessage: tooltipMessageReducer,
    appTour: appTourReducer,
    [vaultApiSlice.reducerPath]: vaultApiSlice.reducer,
    [nomineeApiSlice.reducerPath]: nomineeApiSlice.reducer,
    [feedbackApiSlice.reducerPath]: feedbackApiSlice.reducer,
    [willApiSlice.reducerPath]: willApiSlice.reducer,
    [sharedArtifactApiSlice.reducerPath]: sharedArtifactApiSlice.reducer,
    [personalInfoApiSlice.reducerPath]: personalInfoApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vaultApiSlice.middleware)
      .concat(nomineeApiSlice.middleware)
      .concat(feedbackApiSlice.middleware)
      .concat(willApiSlice.middleware)
      .concat(sharedArtifactApiSlice.middleware)
      .concat(personalInfoApiSlice.middleware)
});
