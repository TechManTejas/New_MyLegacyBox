import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const appTourSlice = createSlice({
  name: "appTour",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = appTourSlice.actions;

export default appTourSlice.reducer;
