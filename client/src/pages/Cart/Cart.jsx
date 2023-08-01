import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../../utils/cartSlice"; // Import the actions
import styles from "./Cart.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <div>
              <h3>
                {item.brand} {item.product}
              </h3>
              <p>Price: ${item.price}</p>
              <div>
                <button type="button" onClick={() => handleDecrease(item)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => handleIncrease(item)}>
                  +
                </button>
              </div>
              <button type="button" onClick={() => handleRemove(item._id)}>
                Remove from cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
