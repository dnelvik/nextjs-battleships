import React from 'react';
import styles from '../styles/Grid.module.scss';
import { useDispatch } from '../store/store';
import {
  setPlacementConfirmed,
  setShipType,
} from '../store/slices/gameStateSlice';
import {sizes} from "../store/types";

const ShipSelection = () => {
  const dispatch = useDispatch();

  const onClick = (size: 'Small' | 'Medium' | 'Large') => {
    dispatch(setShipType({ sizeName: size, sizeNum: sizes[size].length }));
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
