import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHomeTourModal: false,
  showWillTourModal: false,
  showMyCircleTourModal: false,
};

const appToursSlice = createSlice({
  name: "appTours",
  initialState,
  reducers: {
    setShowHomeTourModal: (state, action) => {
      state.showHomeTourModal = action.payload;
    },
    setShowWillTourModal: (state, action) => {
      state.showWillTourModal = action.payload;
    },
    setShowMyCircleTourModal: (state, action) => {
      state.showMyCircleTourModal = action.payload;
    },
  },
});

export const {
  setShowHomeTourModal,
  setShowWillTourModal,
  setShowMyCircleTourModal,
} = appToursSlice.actions;

export default appToursSlice.reducer;
