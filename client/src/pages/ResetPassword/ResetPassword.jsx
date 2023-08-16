// ResetPassword.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_MUTATION } from "../../utils/mutations";
import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [passwordReset, { error, data, loading }] = useMutation(RESET_PASSWORD_MUTATION);
  const { uniqueString, email } = useParams(); // Get the uniqueString from the URL
  // const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [password, setPassword] = useState({ password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, email);
    try {
      const response = await passwordReset({ variables: { email: email, password: password } });
      console.log(response);
      if (!response.data.resetPassword.success) {
        throw new Error("Password reset failed");
      }
    } catch (err) {
      console.error("error resetting password", err);
    }
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {data && data.resetPassword && data.resetPassword.success ? (
        <div>
          <p>{data.resetPassword.message}</p>
          <button type="button" onClick={() => navigate("/myaccount")}>
            Login to continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Enter new Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
          <button type="submit">Submit new Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
