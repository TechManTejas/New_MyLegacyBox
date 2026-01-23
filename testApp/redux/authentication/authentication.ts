import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
  sessionToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionRedux: (state, action) => {
      state.session = action.payload?.session;
      state.sessionToken = action.payload?.session_token;
    },
    clearSessionRedux: (state) => {
      return initialState;
    },
  },
});

const authSelector = (state: { auth: { sessionToken: string } }) => state.auth;

export const getSessionTokenSelector = createSelector(
  authSelector,
  (auth) => auth.sessionToken,
);

export const { setSessionRedux, clearSessionRedux } = authSlice.actions;

export default authSlice.reducer;
