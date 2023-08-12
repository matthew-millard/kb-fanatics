import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    status: "none", // 'none', 'loggedIn', 'signingUp', 'loggingIn'
    user: null,
    error: null,
  },
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
      state.status = "loggedIn";
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.status = "none";
    },
    showLogin: (state) => {
      state.status = "loggingIn";
    },
    showSignUp: (state) => {
      state.status = "signingUp";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { logIn, logOut, showLogin, showSignUp, setUser, setError, clearUser } =
  authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
