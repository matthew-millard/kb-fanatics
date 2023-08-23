/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../../utils/queries";
import { DELETE_ACCOUNT_MUTATION } from "../../utils/mutations";
import OrderHistory from "../OrderHistory";
import ConfirmationModal from "../ConfirmationModal";
import styles from "./Dashboard.module.css";

function Dashboard({ onLogOut }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_ACCOUNT_MUTATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Get user ID from local storage
  let userDetails = {};

  try {
    userDetails = JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    console.error("Error parsing user data from local storage:", error);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Delete the user account
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteAccount({ variables: { _id: userId } });

      if (!response.data.deleteUser.success) {
        throw new Error("Error deleting user account.");
      }

      // Clear the user data from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Clear any user-related state
      dispatch(logOut());

      // Redirect to the home page
      navigate("/");

      handleCloseModal();
    } catch (err) {
      console.error("Error during account deletion:", err.message);
    }
  };

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

      <div className={styles.buttonsContainer}>
        <button type="button" onClick={onLogOut} className={styles.buttons}>
          Logout
        </button>
        <button
          type="button"
          onClick={handleOpenModal}
          className={`${styles.buttons} ${styles.deleteAccountButton}`}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete Account"}
        </button>
        {deleteError && <p className={styles.errorMessage}>Error: {deleteError.message}</p>}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Dashboard;
