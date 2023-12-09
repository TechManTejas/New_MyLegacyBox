import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/authentication";
import screenInfoReducer from "./screenInfo/screenInfo";
import { rootApiSlice } from "./api/rootApi";
import appTourReducer from "./appTour/appTour";
import willFormSlice from "./form/willFormSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    willForm: willFormSlice,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    screenInfo: screenInfoReducer,
    appTours: appTourReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware),
});

export type RootStoreType = ReturnType<typeof store.getState>;
