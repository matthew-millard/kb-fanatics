import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import navLinks from "./navLinks";
import styles from "./NavLinks.module.css";

function NavLinks({ mobile }) {
  const location = useLocation();
  return (
    <ul className={mobile ? styles.navLinksMobile : styles.navLinks}>
      {navLinks.map((linkObj) => (
        <li key={linkObj.title}>
          <Link
            to={linkObj.url}
            className={location.pathname === linkObj.url ? styles.activeLink : ""}
          >
            {linkObj.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

NavLinks.propTypes = {
  mobile: PropTypes.bool,
};

NavLinks.defaultProps = {
  mobile: false,
};

export default NavLinks;
