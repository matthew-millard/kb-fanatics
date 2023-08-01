import React from "react";
import styles from "./AddToCartButton.module.css";

function AddToCartButton() {
  return (
    <button className={styles.button} type="button" aria-label="Add item to cart">
      ADD TO CART
    </button>
  );
}

export default AddToCartButton;
