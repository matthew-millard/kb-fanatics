/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../../utils/queries";

function Dashboard({ onLogOut }) {
  // Get user ID from local storage
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userId = userDetails._id;

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

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* User Details Section */}
      <div className="user-details">
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

      {/* Logout Button */}
      <button type="button" onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
