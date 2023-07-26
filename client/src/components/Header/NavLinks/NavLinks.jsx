import { navLinks } from './navLinks';
import styles from './NavLinks.module.css';

function NavLinks() {
  return (
    <ul className={styles.navLinks}>
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
