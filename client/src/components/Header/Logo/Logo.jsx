import styles from './Logo.module.css';

function Logo() {
  return (
    <a href="/" className={styles.container}>
      <span className={styles.logo}>KYBDS</span>
    </a>
  );
}

export default Logo;
