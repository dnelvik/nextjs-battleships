import React from 'react';
import styles from '../styles/Home.module.scss';
import ShipSelection from '../Components/ShipSelection';
import PlacementGrid from '../Components/grid/PlacementGrid';

const battleships = () => {
  return (
    <div className={styles.home}>
      <PlacementGrid mapSize={10} />
      <ShipSelection />
    </div>
  );
};

export default battleships;
