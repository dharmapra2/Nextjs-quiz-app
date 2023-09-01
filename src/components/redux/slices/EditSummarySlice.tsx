import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  clickedSave: String;
  valueMedHistory: {};
  valueMedication: {};
  valuePregnancyHistory: {};
  valueArtcycleSummary: {};
}

const initialState: filterState = {
  clickedSave: "no",
  valueMedHistory: {},
  valueMedication: {},
  valuePregnancyHistory: {},
  valueArtcycleSummary: {},
};

export const editSummary = createSlice({
  name: "editSummary",
  initialState,
  reducers: {
    addPatientMedHistory: (state, data: PayloadAction<object>) => {
      state.valueMedHistory = { ...data.payload };
    },
    addMedication: (state, data: PayloadAction<object>) => {
      state.valueMedication = { ...data.payload };
    },
    addPregnancyHistory: (state, data: PayloadAction<object>) => {
      state.valuePregnancyHistory = { ...data.payload };
    },
    addArtcycleSummary: (state, data: PayloadAction<object>) => {
      state.valueArtcycleSummary = { ...data.payload };
    },
    clickSave: (state) => {
      state.clickedSave = "yes";
    },
    resetValues: (state) => {
      state.valueMedHistory = {};
      state.valueMedication = {};
      state.valuePregnancyHistory = {};
      state.valueArtcycleSummary = {};
      state.clickedSave = "no";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPatientMedHistory, addMedication, addPregnancyHistory, addArtcycleSummary, clickSave, resetValues } = editSummary.actions;

export default editSummary.reducer;
