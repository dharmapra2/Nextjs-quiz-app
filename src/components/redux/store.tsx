import { configureStore } from "@reduxjs/toolkit";
import { questionControl } from "./slices/EditSummarySlice";





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

const localStorage = {
  loadFromLocalStorage: (key = "store") => {
    try {
      const serializedStore = window.localStorage.getItem(key);
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
    } catch (error) {
      console.log(`localStorage.getItem error ==> ${error}`);
      return null;
    }
  },
  saveToLocalStorage: (value: any, key = "store") => {
    try {
      const serializedStore = JSON.stringify(value);
      window.localStorage.setItem(key, serializedStore);
    } catch (error) {
      console.log(`localStorage.setItem error ==> ${error}`);
    }
  },
};

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  // localStorage.saveToLocalStorage();
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
