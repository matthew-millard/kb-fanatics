import styles from './App.module.css';
import { Footer, Header, Main } from './components';

function App() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.main}>
        <Main />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
