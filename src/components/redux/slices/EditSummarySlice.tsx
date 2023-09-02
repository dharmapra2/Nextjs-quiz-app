import { singleQuestion } from "@/components/service/Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  clickedSave: String;
  questionData: [singleQuestion] | any;
  questionInputes: any;
}

const initialState: filterState = {
  clickedSave: "no",
  questionData: [],
  questionInputes: []
};

export const questionControl = createSlice({
  name: "questionControl",
  initialState,
  reducers: {
    storeQuestions: (state, data: PayloadAction<object>) => {
      state.questionData = { ...data.payload };
    },
    addMedication: (state, data: PayloadAction<object>) => {
      state.questionInputes = { ...data.payload };
    },
    clickSave: (state) => {
      state.clickedSave = "yes";
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeQuestions, addMedication, clickSave } = questionControl.actions;

export default questionControl.reducer;
