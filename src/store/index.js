import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Features/UserAuth/AuthSlice";

const rootReducer = {
  auth: AuthSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});
