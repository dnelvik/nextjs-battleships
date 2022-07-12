import React from 'react';
import styles from '../styles/Grid.module.scss';
import { useDispatch } from '../store/store';
import {
  setPlacementConfirmed,
  setShipType,
} from '../store/slices/gameStateSlice';

export enum ShipSize {
  'Small' = 2,
  'Medium' = 3,
  'Large' = 4,
}

const ShipSelection = () => {
  const dispatch = useDispatch();

  const onClick = (size: 'Small' | 'Medium' | 'Large') => {
    dispatch(setShipType({ sizeName: size, sizeNum: ShipSize[size] }));
  };

  const confirmPlacement = () => {
    setPlacementConfirmed(true);
  };

  return (
    <div className={styles.shipButtonsContainer}>
      <button className="btn btn-primary" onClick={() => onClick('Small')}>
        Small Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('Medium')}>
        Medium Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('Large')}>
        Large Ship
      </button>
      <button className="btn btn-primary" onClick={confirmPlacement}>
        Confirm placement
      </button>
    </div>
  );
};

export default ShipSelection;
