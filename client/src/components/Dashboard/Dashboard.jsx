/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../../utils/queries";
import OrderHistory from "../OrderHistory";
import styles from "./Dashboard.module.css";

function Dashboard({ onLogOut }) {
  // Get user ID from local storage
  let userDetails = {};

  try {
    userDetails = JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    console.errsor("Error parsing user data from local storage:", error);
  }

  const userId = userDetails?._id;

  // Check if the user ID is valid
  if (!userId) {
    return <p>Please verify your account.</p>;
  }

  // Fetch the user details when the component mounts
  const {
    data: userData,
    loading,
    error,
  } = useQuery(USER_QUERY, {
    variables: { _id: userId },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const user = userData?.user;

  if (!user) {
    return <p>Error: User details not found. Please try again later.</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.heading}>My Account</h2>
      <div className={styles.userDetails}>
        <h3>User Details</h3>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>City:</strong> {user.city}
        </p>
        <p>
          <strong>State / Province:</strong> {user.stateProvince}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>Postal Code:</strong> {user.postalCode}
        </p>
      </div>
      <hr className={styles.divider} />
      {/* Order History Section */}
      <div className={styles.orderHistoryContainer}>
        <OrderHistory userId={userId} />
      </div>

      {/* Logout Button */}
      <div className={styles.buttonsContainer}>
        <button type="button" onClick={onLogOut} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
