import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import FindGame from '../Components/FindGame';
import CreateGame from "../Components/CreateGame";

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <h2 className={styles.home__title}>Battleships</h2>
        <div className={styles.home__forms}>
            <FindGame />
            <CreateGame />
        </div>
      </div>
    </div>
  );
};

export default Home;
