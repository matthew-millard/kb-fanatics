import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Footer, Header, Main, MobileHeader } from "./components";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>{isMobile ? <MobileHeader /> : <Header />}</div>
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
