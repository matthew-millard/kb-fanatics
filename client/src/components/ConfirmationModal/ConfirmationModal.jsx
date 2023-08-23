/* eslint-disable react/prop-types */
import React from "react";
import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Delete My Account</h3>
        <p>Are you sure you want to delete your account?</p>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={onClose} className={styles.button}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
