import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SWITCHES } from "../../utils/queries";
// import styles from "./Switches.module.css";

function Switches() {
  const { loading, error, data } = useQuery(GET_SWITCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data.switches.map(({ _id, brand, product, switchType, price, quantity }) => (
    <div key={_id}>
      <h3>{brand}</h3>
      <p>{product}</p>
      <p>{switchType}</p>
      <p>{quantity}</p>
      <p>{price}</p>
    </div>
  ));
}
export default Switches;
