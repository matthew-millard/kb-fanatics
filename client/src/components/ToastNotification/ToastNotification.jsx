/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-light-svg-icons";
import styles from "./ToastNotification.module.css";

function ToastNotification({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  return (
    <div className={styles.toastContainer}>
      <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
      <p>{message}</p>
    </div>
  );
}

export default ToastNotification;
