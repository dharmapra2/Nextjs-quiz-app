import { loadFromLocalStorage } from "@/components/Utility/Utility";
import { singleQuestion } from "@/components/service/Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  clickedSave: String;
  questionData: [singleQuestion] | any;
}

const storage = loadFromLocalStorage('quizStore');
const initialState: filterState = storage ?? {
  clickedSave: "no",
  questionData: [],
};

export const questionControl = createSlice({
  name: "questionControl",
  initialState,
  reducers: {
    storeQuestions: (state, data: PayloadAction<object>) => {
      state.questionData = data?.payload;
    },
    setSelectedOptions: (state, action: PayloadAction<{ itemId: number | any, opt: string | any }>) => {
      if (state.clickedSave == "yes") {
        return;
      }
      const { itemId, opt = null } = action.payload;
      const find = state.questionData.find(
        (question: { itemId: number; }) => question.itemId === itemId
      );
      if (find && opt != null) {
        find.selectedOption = opt;
        find.visibility.attempted = true;
      } else if (find && opt == null && find?.selectedOption == "") {
        find.visibility.visited = true;
      }
    },
    clickSave: (state) => {
      if (state.clickedSave != "yes") {
        state.clickedSave = "yes";
      } else {
        state.clickedSave = "no";
        state.questionData = [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeQuestions, setSelectedOptions, clickSave } = questionControl.actions;

export default questionControl.reducer;
