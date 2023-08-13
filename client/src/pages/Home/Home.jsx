import React from "react";
import Hero from "../../components/Hero";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <h1>
          Welcome to KB Fanatics. <br /> A store dedicated to mechanical keyboard enthusiasts.
        </h1>
        <Hero />
      </div>
    </div>
  );
}

export default Home;
