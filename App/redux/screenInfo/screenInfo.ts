import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const screenInfoSlice = createSlice({
  name: "screenInfo",
  initialState,
  reducers: {
    setScreenInfo: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setScreenInfo } = screenInfoSlice.actions;

export default screenInfoSlice.reducer;
