import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./utils/cartSlice";
import authReducer from "./utils/authSlice";
import cartSaver from "./utils/cartSaver";
import { Footer, Header, MobileHeader } from "./components";
import styles from "./App.module.css";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartSaver),
});

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Check the token when the App component loads
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for localStorage changes to keep authentication state consistent across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        setIsAuthenticated(!!localStorage.getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          {isMobile ? <MobileHeader /> : <Header isAuthenticated={isAuthenticated} />}
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
