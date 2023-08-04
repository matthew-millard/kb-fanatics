import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./MyAccount.module.css";
import SIGNUP_MUTATION from "./signup";
import LOGIN_MUTATION from "./login";

function MyAccount() {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [fName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [country, setCountry] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          fName,
          LName,
          eMail,
          password,
          address1,
          city,
          stateProvince,
          country,
        },
      });
    } catch (error) {
      // console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          eMail: loginEmail,
          password: loginPassword,
        },
      });
    } catch (error) {
      // console.error(error);
    }
  };

  if (isLogin) {
    return (
      <div>
        <h1 className={styles.h1}>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <button type="button" onClick={() => setIsLogin(false)}>
          Switch to Signup
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.h1}>Create Account</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          className={styles.input}
        />
        <input
          type="text"
          value={LName}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          className={styles.input}
        />
        <input
          type="email"
          value={eMail}
          onChange={(e) => setEMail(e.target.value)}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Address"
          className={styles.input}
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className={styles.input}
        />
        <input
          type="text"
          value={stateProvince}
          onChange={(e) => setStateProvince(e.target.value)}
          placeholder="State/Province"
          className={styles.input}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
      <button type="button" onClick={() => setIsLogin(true)}>
        Switch to Login
      </button>
    </div>
  );
}

export default MyAccount;
