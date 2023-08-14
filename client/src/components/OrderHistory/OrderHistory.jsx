/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { USER_ORDERS_QUERY } from "../../utils/queries";
import { resetNewOrderFlag } from "../../utils/orderSlice";
import formatDate from "../../utils/formatDate";
import styles from "./OrderHistory.module.css";

function OrderHistory({ userId }) {
  const { data, loading, error, refetch } = useQuery(USER_ORDERS_QUERY, {
    variables: { _id: userId },
  });

  const newOrderAdded = useSelector((state) => state.orders.newOrderAdded);
  const dispatch = useDispatch();

  //   This useEffect hook will run whenever the newOrderAdded flag changes.
  //   If the flag is true, we will refetch the orders.
  useEffect(() => {
    if (newOrderAdded) {
      refetch();
      dispatch(resetNewOrderFlag()); // reset the flag after refetch
    }
  }, [newOrderAdded, refetch, dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const orders = data ? data.getUserOrders : [];

  return (
    <div className={styles.container}>
      <h3>Order History</h3>

      {orders.length === 0 ? (
        <p>You currently don&apos;t have any orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.order}>
            <p>{formatDate(order.createdAt)}</p>
            <Link to={`/order/${order._id}`}>{order._id}</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
