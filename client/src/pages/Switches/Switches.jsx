import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SWITCHES } from "../../utils/queries";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import styles from "./Switches.module.css";
import img from "./images/gateron_g_pro_3.0_silver_linear.webp";

function Switches() {
  const { loading, error, data } = useQuery(GET_SWITCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Switches</h1>
      <p className={styles.description}>
        Nestled just below the keycaps, mechanical keyboard switches are responsible for creating
        the specific typing feel of any board. Shop our selection of class-leading clicky, tactile,
        and linear switches below.
      </p>
      <div className={styles.cards}>
        {data.switches.map(({ _id, brand, product, switchType, price, quantity, imageUrl }) => (
          <div key={_id} className={styles.card}>
            <img src={img} alt={brand} className={styles.cardImage} />
            <div className={styles.cardCopy}>
              <h3 className={styles.cardTitle}>
                {brand} {product}
              </h3>
              <div className={styles.cardText}>
                <p>Switch Type: {switchType}</p>
                <p>In Stock: {quantity}</p>
                <p>Price: ${price} / (Pack of 10)</p>
              </div>
              <AddToCartButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Switches;
