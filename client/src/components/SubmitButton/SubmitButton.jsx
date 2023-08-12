/* eslint-disable react/prop-types */
import React from "react";
import styles from "./SubmitButton.module.css";

function SubmitButton({ text, onClick }) {
  return (
    <button type="submit" className={styles.submitButton} onClick={onClick}>
      {text}
    </button>
  );
}

export default SubmitButton;
