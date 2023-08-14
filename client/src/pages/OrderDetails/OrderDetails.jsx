import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SINGLE_ORDER_QUERY } from "../../utils/queries";

function OrderDetails() {
  const { orderId } = useParams(); // Extract the orderId from the URL
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { _id: orderId },
  });

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const order = data ? data.getSingleOrder : null;

  return (
    <div>
      <h3>Order ID: {order._id}</h3>
      <p>Total: {order.orderTotal}</p>
      <p>Subtotal: {order.orderSubTotal}</p>
      <p>Tax: {order.orderTax}</p>
      <h4>Items:</h4>
      {order.orderItems.map((item) => (
        <div key={item.productId}>
          <img src={item.image} alt={item.model} />
          <p>Brand: {item.brand}</p>
          <p>Model: {item.model}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
      {/* ... any other details you'd like to display */}
    </div>
  );
}

export default OrderDetails;
