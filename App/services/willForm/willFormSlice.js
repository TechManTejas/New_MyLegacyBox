import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const selectedAssetsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = {
  personalInfo: {},
  witnesses: [],
  beneficiaries: [],
  assets: [],
  executors: [],
  declarationInfo: {
    place: "",
    declaration: "",
  },
  selectedAssets: selectedAssetsAdapter.getInitialState(),
};

export const willFormSlice = createSlice({
  name: "willForm",
  initialState,
  reducers: {
    setPersonalInfoRedux: (state, action) => {
      state.personalInfo = action.payload;
    },
    setDeclarationInfoRedux: (state, action) => {
      state.declarationInfo = action.payload;
    },
    addWitnessRedux: (state, action) => {
      state.witnesses.push(action.payload);
    },
    removeWitnessRedux: (state, action) => {
      state.witnesses = state.witnesses.filter(
        (elem) => elem._id !== action.payload
      );
    },
    addExecutorRedux: (state, action) => {
      state.executors.push(action.payload);
    },
    removeExecutorRedux: (state, action) => {
      state.executors = state.executors.filter(
        (elem) => elem._id !== action.payload
      );
    },
    addBeneficiaryRedux: (state, action) => {
      state.beneficiaries.push(action.payload);
    },
    removeBeneficiaryRedux: (state, action) => {
      state.beneficiaries = state.beneficiaries.filter(
        (elem) => elem._id !== action.payload
      );
    },
    setAssetRedux: (state, action) => {
      state.assets = action.payload;
    },
    addAssetRedux: (state, action) => {
      state.assets.push(action.payload);
    },
    editAssetByIndexRedux: (state, action) => {
      state.assets[action.payload.index] = action.payload.witness;
      return state;
    },
    addSelectedAssetRedux: (state, action) => {
      selectedAssetsAdapter.addOne(state.selectedAssets, action.payload);
    },
    removeSelectedAssetRedux: (state, action) => {
      selectedAssetsAdapter.removeOne(state.selectedAssets, action.payload);
    },
    clearAssets: (state) => {
      state.assets = [];
      return state;
    },
    clearWillFormRedux: () => initialState,
  },
});

export const {
  setPersonalInfoRedux,
  setDeclarationInfoRedux,
  addWitnessRedux,
  removeWitnessRedux,
  addExecutorRedux,
  removeExecutorRedux,
  addBeneficiaryRedux,
  removeBeneficiaryRedux,
  setAssetRedux,
  addAssetRedux,
  editAssetByIndexRedux,
  addSelectedAssetRedux,
  removeSelectedAssetRedux,
  clearWillFormRedux,
  clearAssets,
} = willFormSlice.actions;

const willFormSelector = (state) => state.willForm;

export const getWill = createSelector(willFormSelector, (willForm) => willForm);

export const getPersonalInfoSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.personalInfo
);

export const getWitnessesSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.witnesses
);

export const getExecutorsSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.executors
);

export const getBeneficiariesSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.beneficiaries
);

export const getAssetsSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.assets
);

export const getDeclarationSelector = createSelector(
  willFormSelector,
  (willForm) => willForm.declarationInfo
);

const selectedAssetsSelector = selectedAssetsAdapter.getSelectors(
  (state) => state.willForm.selectedAssets
);

export const getSelectedAssetsSelector = selectedAssetsSelector.selectAll;
export const getSelectedAssetsEntitiesSelector =
  selectedAssetsSelector.selectEntities;
export default willFormSlice.reducer;
