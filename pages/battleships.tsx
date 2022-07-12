import React from 'react';
import Grid from '../Components/Grid';
import styles from '../styles/Home.module.scss';
import ShipSelection from '../Components/ShipSelection';

const battleships = () => {
  return (
    <div className={styles.home}>
      <Grid mapSize={10} />
      <ShipSelection />
    </div>
  );
};

export default battleships;
