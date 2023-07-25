import styles from './App.module.css';
import { Footer, Header, Main } from './components';

function App() {
  return (
    <div className={styles.pageContainer}>
      <Header className={styles.header} />
      <Main className={styles.main} />
      <Footer className={styles.footer} />
    </div>
  );
}

export default App;
