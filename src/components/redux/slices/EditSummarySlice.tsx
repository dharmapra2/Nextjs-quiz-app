import { loadFromLocalStorage } from "@/components/Utility/Utility";
import { singleQuestion } from "@/components/service/Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  clickedSave: String;
  questionData: [singleQuestion] | any;
}

const initialState: filterState = loadFromLocalStorage('quizStore');

export const questionControl = createSlice({
  name: "questionControl",
  initialState,
  reducers: {
    storeQuestions: (state, data: PayloadAction<object>) => {
      state.questionData = data?.payload;
    },
    clickSave: (state) => {
      state.clickedSave = "yes";
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeQuestions, clickSave } = questionControl.actions;

export default questionControl.reducer;
