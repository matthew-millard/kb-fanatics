import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/pro-light-svg-icons";
import { NavLinks, Account, Cart, SocialIcons, Logo } from "./Header";
import styles from "./MobileHeader.module.css";
import SearchBar from "./SearchBar";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.mobileHeader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.menuIcon}>
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          onClick={handleClick}
          className={`${styles.menuIcon}  ${isOpen ? styles.rotateIcon : ""}`}
        />
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.userControls}>
          <Account />
          <Cart />
        </div>
        <div className={styles.navLinks}>
          <NavLinks mobile />
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div className={styles.socialIcons}>
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
