import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import SocialIcons from "./SocialIcons";

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  console.log("Rendering Header with isLoggedIn:", isLoggedIn);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.navLinks}>
        <NavLinks />
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.userControls}>
        <div className={styles.account}>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div className={styles.cart}>
          <Cart />
        </div>
      </div>
      <div className={styles.socialIcons}>
        <SocialIcons />
      </div>
    </header>
  );
}

export { NavLinks, Cart, SocialIcons, Logo };
