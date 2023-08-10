import React from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/cartSlice";
import { GET_KEYBOARDS } from "../../utils/queries";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import styles from "./Keyboards.module.css";

function Keyboards() {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const { loading, error, data } = useQuery(GET_KEYBOARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Keyboards</h1>
      <p className={styles.description}>Shop our selection of ready-to-use keyboards.</p>
      <div className={styles.cards}>
        {data.keyboards.map(
          ({
            _id,
            brand,
            model,
            color,
            keycaps,
            plate,
            switches,
            hotswap,
            price,
            quantity,
            imageURL,
          }) => (
            <div key={_id} className={styles.card}>
              <img src={imageURL} alt={brand} className={styles.cardImage} />
              <div className={styles.cardCopy}>
                <h3 className={styles.cardTitle}>
                  {brand} {model}
                </h3>
                <div className={styles.cardText}>
                  <p>Color: {color}</p>
                  <p>Keycaps: {keycaps}</p>
                  <p>Plate: {plate}</p>
                  <p>Switches: {switches}</p>
                  <p>Hotswap: {hotswap}</p>
                  <p>In Stock: {quantity}</p>
                  <p>Price: ${price}</p>
                </div>
                <AddToCartButton
                  onClick={() => handleAddToCart({ _id, brand, model, price, imageURL })}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Keyboards;
