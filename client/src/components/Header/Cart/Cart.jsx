import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/pro-light-svg-icons";
import styles from "./Cart.module.css";

function Cart() {
  return (
    <div className={styles.cart}>
      <FontAwesomeIcon icon={faCartShopping} />
    </div>
  );
}

export default Cart;
