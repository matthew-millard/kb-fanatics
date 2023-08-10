import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login"); 
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h2>What is up Keyboard Warriors!</h2>
      <p>Here is your Dashboard homies</p>
      <button onClick={handleLogout} className={styles.logoutButton} type="button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
