import { createSlice } from "@reduxjs/toolkit";

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
      state = initialState;
    },
  },
});

export const { setSessionRedux, clearSessionRedux } = authSlice.actions;

export default authSlice.reducer;
