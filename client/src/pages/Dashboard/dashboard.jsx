import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import dashboardImage from "../../images/Keyboard_warrior_icon.png";

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
      <img src={dashboardImage} alt="Dashboard" className={styles.centerImage} />
      <button onClick={handleLogout} className={styles.logoutButton} type="button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
