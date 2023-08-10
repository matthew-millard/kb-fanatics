import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../MyAccount/loginMutation";
import { useNavigate } from "react-router-dom";
import "./login.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const responseData = await login({
        variables: {
          eMail: email,
          password: password,
        },
      });

      if (
        responseData &&
        responseData.data &&
        responseData.data.login &&
        responseData.data.login.token
      ) {
        localStorage.setItem("authToken", responseData.data.login.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/MyAccount");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <div>
        <button type="submit" onClick={handleCreateAccountClick}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
