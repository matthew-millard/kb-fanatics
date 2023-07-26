import styles from './Logo.module.css';

function Logo() {
  return (
    <a href="/" style={{ 'text-decoration': 'none' }}>
      <span className={styles.logo}>Keebs World</span>
    </a>
  );
}

export default Logo;
