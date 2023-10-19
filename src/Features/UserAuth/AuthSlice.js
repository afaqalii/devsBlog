import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: { user: null, isAuthenticated: false },
    reducers: {
      login: (state, action) => {
        // Instead of modifying state directly, return a new state object
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      },
      logout: (state) => {
        // Again, return a new state object
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      },
    },
  });
  

  export const {login, logout} = AuthSlice.actions
  export default AuthSlice.reducer