import { configureStore } from "@reduxjs/toolkit";
import { questionControl } from "./slices/EditSummarySlice";
import { saveToLocalStorage } from "@/components/Utility/Utility";



export const store = configureStore({
  reducer: {
    question: questionControl.reducer,
  },
});



store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state?.question, 'quizStore');
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
