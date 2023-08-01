import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import navLinks from "./navLinks";
import styles from "./NavLinks.module.css";

function NavLinks({ mobile }) {
  return (
    <ul className={mobile ? styles.navLinksMobile : styles.navLinks}>
      {navLinks.map((linkObj) => (
        <li>
          <Link to={linkObj.url}>{linkObj.title}</Link>
        </li>
      ))}
    </ul>
  );
}

NavLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default NavLinks;
