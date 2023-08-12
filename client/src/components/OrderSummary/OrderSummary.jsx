/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./OrderSummary.module.css";

function OrderSummary({ cart }) {
  // Calculate the total price of the cart
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // eslint-disable-next-line no-console
  console.log(cart);
  return (
    <div className={styles.container}>
      <h3>Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item._id} className={styles.item}>
            <div className={styles.itemImage}>
              <img src={item.imageURL} alt={`${item.brand} ${item.model}`} />
            </div>
            <div>{`${item.brand} ${item.model ? ` ${item.model}` : ""}`}</div>
            <div>
              {item.quantity} x ${item.price.toFixed(2)}
            </div>
            <div>Subtotal: ${(item.quantity * item.price).toFixed(2)}</div>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default OrderSummary;
