import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/pro-light-svg-icons";
import styles from "./Cart.module.css";

function Cart() {
  return (
    <div className={styles.cart}>
      <Link to="/cart">
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>
    </div>
  );
}

export default Cart;
