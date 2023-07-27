import styles from './Logo.module.css';

function Logo() {
  return (
    <a href="/" style={{ 'text-decoration': 'none' }}>
      <span className={styles.logo}>KYBDS</span>
    </a>
  );
}

export default Logo;
