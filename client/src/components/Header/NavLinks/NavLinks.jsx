import { navLinks } from './navLinks';
import styles from './NavLinks.module.css';

function NavLinks({ mobile }) {
  return (
    <ul className={mobile ? styles.navLinksMobile : styles.navLinks}>
      {navLinks.map((linkObj, index) => {
        return (
          <li key={index}>
            <a href={linkObj.url}>{linkObj.title}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
