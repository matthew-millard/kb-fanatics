import React from "react";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <a href="/" className={styles.container}>
      <span className={styles.logo}>KB FANATICS</span>
    </a>
  );
}

export default Logo;
