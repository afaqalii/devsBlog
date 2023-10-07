import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Features/UserAuth/AuthSlice";



const rootReducer = {
    auth: AuthSlice,
    // todos: todosReducer,
    // counter: counterReducer,
    // Add other slice reducers here if needed
  };


export const store = configureStore({
    reducer:rootReducer
});
