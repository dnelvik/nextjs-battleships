import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import FindGame from '../Components/FindGame';
import React from 'react';
import { reset } from '../store/slices/gameStateSlice';
import { useDispatch } from '../store/store';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <h2 className={styles.home__title}>Verdens kuleste nettside</h2>
        <FindGame />
      </div>
    </div>
  );
};

export default Home;
