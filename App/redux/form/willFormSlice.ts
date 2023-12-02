import {
  EntityState,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  BeneficiaryType,
  ExecutorType,
  PersonalInfoType,
  WitnessType,
} from "../../../types/entity";

interface WillFormSliceType {
  _id: string;
}

const selectedAssetsAdapter = createEntityAdapter<WillFormSliceType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

interface initialStateType {
  personalInfo: PersonalInfoType | {};
  witnesses: WitnessType[];
  beneficiaries: BeneficiaryType[];
  executors: ExecutorType[];
  assets: any[];
  declarationInfo: {
    place: string;
    declaration: string;
  };
  selectedAssets: EntityState<WillFormSliceType>;
  residualDistData: any[];
  secondaryDistData: any[];
  willRolesTracker: any[];
}

const initialState: initialStateType = {
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
  residualDistData: [],
  secondaryDistData: [],
  willRolesTracker: [],
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
    setWitnessRedux: (state, action) => {
      state.witnesses = action.payload;
      return state;
    },
    addWitnessRedux: (state, action) => {
      state.witnesses.push(action.payload);
    },
    removeWitnessRedux: (state, action) => {
      state.witnesses = state.witnesses.filter(
        (elem) => elem._id !== action.payload
      );
    },
    setExecutorRedux: (state, action) => {
      state.executors = action.payload;
      return state;
    },
    addExecutorRedux: (state, action) => {
      state.executors.push(action.payload);
    },
    removeExecutorRedux: (state, action) => {
      state.executors = state.executors.filter(
        (elem) => elem._id !== action.payload
      );
    },
    setBeneficiaryRedux: (state, action) => {
      state.beneficiaries = action.payload;
      return state;
    },
    addBeneficiaryRedux: (state, action) => {
      state.beneficiaries.push(action.payload);
    },
    editBeneficiaryRedux: (state, action) => {
      state.beneficiaries[action.payload.index] = action.payload.beneficiary;
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
    addResidualDistData: (state, action) => {
      state.residualDistData = action.payload;
    },
    addSecondaryDistData: (state, action) => {
      state.secondaryDistData = action.payload;
    },
    clearAssets: (state) => {
      state.assets = [];
      state.residualDistData = [];
      state.secondaryDistData = [];
      return state;
    },
    setWillRolesTracker: (state, action) => {
      state.willRolesTracker = action.payload;
    },
    clearWillFormRedux: () => initialState,
  },
});

export const {
  setBeneficiaryRedux,
  setExecutorRedux,
  setWitnessRedux,

  setWillRolesTracker,
  addResidualDistData,
  addSecondaryDistData,
  setPersonalInfoRedux,
  setDeclarationInfoRedux,
  addWitnessRedux,
  removeWitnessRedux,
  addExecutorRedux,
  removeExecutorRedux,
  addBeneficiaryRedux,
  editBeneficiaryRedux,
  removeBeneficiaryRedux,
  setAssetRedux,
  addAssetRedux,
  editAssetByIndexRedux,
  addSelectedAssetRedux,
  removeSelectedAssetRedux,
  clearWillFormRedux,
  clearAssets,
} = willFormSlice.actions;

const willFormSelector = (state: { willForm: any }) => state.willForm;

export const getWill = createSelector(willFormSelector, (willForm) => willForm);

export const getWillRolesTrackerData = createSelector(
  willFormSelector,
  (willForm) => willForm.willRolesTracker
);

export const getResidualDistData = createSelector(
  willFormSelector,
  (willForm) => willForm.residualDistData
);

export const getSecondaryDistData = createSelector(
  willFormSelector,
  (willForm) => willForm.secondaryDistData
);

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
  (state: { willForm: { selectedAssets: any } }) =>
    state.willForm.selectedAssets
);

export const getSelectedAssetsSelector = selectedAssetsSelector.selectAll;
export const getSelectedAssetsEntitiesSelector =
  selectedAssetsSelector.selectEntities;
export default willFormSlice.reducer;
