/* eslint-disable no-console */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EMAILCHECK_MUTATION } from "../../utils/mutations";
// import { sendPasswordResetEmail } from "../../utils/emailUtils";
// import SubmitButton from "../SubmitButton";
import styles from "./ForgotPassword.module.css";

let userExists = false;

function ForgotPassword() {
  const [emailCheck, { errorEmailCheck }] = useMutation(EMAILCHECK_MUTATION);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const checkUserExistence = async () => {
    try {
      const response = await emailCheck({
        variables: { email },
      });

      userExists = response?.data?.emailCheck?.success;

      // return userExists;
      console.log(response);
      console.log(userExists);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    setIsLoading(true);

    try {
      userExists = await checkUserExistence();

      if (userExists) {
        // Send the password reset email using the utility function
        // await sendPasswordResetEmail({ email });
        // return <p>Password reset email sent. Please check your email</p>;
        setSuccessMessage("Password reset email sent. Please check your inbox.");
      } else {
        setErrorMessage("User with this email does not exist.");
      }
    } catch (error) {
      setErrorMessage("Error sending password reset email.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <label htmlFor="email">Email: </label>{" "}
      <input type="email" name="email" id="email" onChange={handleEmailChange} required />
      <button type="submit">Send reset</button>
      {errorEmailCheck && <p>Error: {errorEmailCheck.message}</p>}
      {userExists ? <p>{successMessage}</p> : <p>{errorMessage}</p>}
    </form>
  );
}

export default ForgotPassword;
