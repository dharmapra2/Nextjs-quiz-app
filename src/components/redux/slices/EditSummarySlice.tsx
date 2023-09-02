import { loadFromLocalStorage } from "@/components/Utility/Utility";
import { singleQuestion } from "@/components/service/Type";
import ErrorPopup from "@/components/widget/PopUp/ErrorPopup";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

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
      try {
        const { itemId, opt = null } = action.payload;
        console.log(itemId, opt);
        const find = state.questionData.find(
          (question: { itemId: number; }) => question.itemId === itemId
        );
        if (find && opt != null) {
          find.selectedOption = opt;
          find.visibility.attempted = true;
        } else if (find && opt == null && find?.selectedOption == "") {
          find.visibility.visited = true;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something wents wrong",
        });
      }
    },
    clickSave: (state) => {
      state.clickedSave = "yes";
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeQuestions, setSelectedOptions, clickSave } = questionControl.actions;

export default questionControl.reducer;
