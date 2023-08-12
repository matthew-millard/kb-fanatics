import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, showLogin, showSignUp, selectAuth } from "../../utils/authSlice";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";
import styles from "./MyAccount.module.css";

function MyAccount() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  const handleLogout = () => {
    // Remove token and user object from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear any user-related state
    dispatch(logOut());
  };

  return (
    <div className={styles.container}>
      {authState.status === "none" && (
        <div className={styles.content}>
          <div className={styles.heading}>
            <h2>Please sign up or login to your account</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} type="button" onClick={() => dispatch(showLogin())}>
              Login
            </button>
            <button className={styles.button} type="button" onClick={() => dispatch(showSignUp())}>
              Sign Up
            </button>
          </div>
        </div>
      )}
      {authState.status === "loggingIn" && <Login onSuccess={() => dispatch(logIn())} />}
      {authState.status === "signingUp" && <SignUp onSuccess={() => dispatch(showLogin())} />}
      {authState.isAuthenticated && <Dashboard user={authState.user} onLogOut={handleLogout} />}
    </div>
  );
}

export default MyAccount;
