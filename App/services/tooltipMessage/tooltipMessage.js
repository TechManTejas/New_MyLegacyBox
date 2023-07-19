import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const tooltipMessageSlice = createSlice({
  name: "tooltipMessage",
  initialState,
  reducers: {
    setToolTipMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setToolTipMessage } = tooltipMessageSlice.actions;

export default tooltipMessageSlice.reducer;
