import React from "react";
import PropTypes from "prop-types";
import navLinks from "./navLinks";
import styles from "./NavLinks.module.css";

function NavLinks({ mobile }) {
  return (
    <ul className={mobile ? styles.navLinksMobile : styles.navLinks}>
      {navLinks.map((linkObj) => (
        <li>
          <a href={linkObj.url}>{linkObj.title}</a>
        </li>
      ))}
    </ul>
  );
}

NavLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default NavLinks;
