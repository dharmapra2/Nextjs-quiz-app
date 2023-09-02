import { configureStore } from "@reduxjs/toolkit";
import { questionControl } from "./slices/EditSummarySlice";
import { loadFromLocalStorage, saveToLocalStorage } from "@/components/Utility/Utility";



// const authMiddleware = (store: { getState: () => { (): any; new(): any; question: any; }; }) => (next: (arg0: any) => any) => (action: { type: string; }) => {
//   const result = next(action);
//   if (action.type?.startsWith('question/')) {
//     const authState = store.getState().question;
//     localStorage.setItem('question', JSON.stringify(authState))
//   }
//   return result;
// };



export const store = configureStore({
  reducer: {
    question: questionControl.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});



store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state?.question, 'quizStore');
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
