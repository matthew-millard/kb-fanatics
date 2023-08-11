/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { setError, setUser, showSignUp } from "../../utils/authSlice";
import SubmitButton from "../SubmitButton";
import styles from "./Login.module.css"; // Assuming you have a CSS module for styling

function Login({ onSuccess }) {
  const [login, { error }] = useMutation(LOGIN_MUTATION);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await login({
        variables: { email: formData.email, password: formData.password },
      });

      const userData = response.data.login.user; // Extract user data

      // Store token and user data in local storage
      localStorage.setItem("token", response.data.login.token);
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data as a string
      // Dispatch setUser action to store user data globally.
      dispatch(setUser(userData)); // Store only user data

      // Execute the onSuccess callback after successful login
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error logging in:", err);
      dispatch(setError(err.message));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Account Login</h1>
        <p>Please enter you email and password below.</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <SubmitButton text="Login" />
        {error && <p className={styles.error}>Error: {error.message}</p>}
        <button className={styles.signUpLink} type="button" onClick={() => dispatch(showSignUp())}>
          Need to sign up instead?
        </button>
      </form>
    </div>
  );
}

export default Login;
