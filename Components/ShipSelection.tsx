import React from 'react';
import styles from '../styles/Grid.module.scss';
import { useDispatch } from '../store/store';
import {
  setPlacementConfirmed,
  setShipType,
} from '../store/slices/gameStateSlice';
import { sizes } from '../store/types';

const ShipSelection = () => {
  const dispatch = useDispatch();

  const onClick = (size: 'smallShip' | 'mediumShip' | 'largeShip') => {
    dispatch(setShipType({ sizeName: size, sizeNum: sizes[size].length }));
  };

  const confirmPlacement = () => {
    setPlacementConfirmed(true);
  };

  return (
    <div className={styles.shipButtonsContainer}>
      <button className="btn btn-primary" onClick={() => onClick('smallShip')}>
        Small Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('mediumShip')}>
        Medium Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('largeShip')}>
        Large Ship
      </button>
      <button className="btn btn-primary" onClick={confirmPlacement}>
        Confirm placement
      </button>
    </div>
  );
};

export default ShipSelection;
