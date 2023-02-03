import React from 'react';
import styles from '../styles/Grid.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
  getRotateX,
  setRotateX,
  setShipType,
} from '../store/slices/gameStateSlice';
import { sizes } from '../util/types';

const ShipSelection = () => {
  const dispatch = useDispatch();
  const rotate = useSelector(getRotateX);

  const onClick = (size: 'smallShip' | 'mediumShip' | 'largeShip') => {
    dispatch(setShipType({ sizeName: size, sizeNum: sizes[size].length }));
  };

  /*
  const getTest = async () => {
    const res = await dbGetCall('danay', 'Mia');
    console.log(JSON.stringify(res));
  };

  const postTest = async () => {
    await dbPostCall('danay');
    await dbPostCall('danay');
  };
*/

  return (
    <div className={styles.shipButtonsContainer}>
      <button
        className="btn btn-primary"
        onClick={() => {
          alert('test');
          console.log('test');
        }}>
        Small Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('mediumShip')}>
        Medium Ship
      </button>
      <button className="btn btn-primary" onClick={() => onClick('largeShip')}>
        Large Ship
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch(setRotateX(!rotate))}>
        Rotate
      </button>
      <button className="btn btn-primary">Get Test</button>
      <button className="btn btn-primary">Post Test</button>
    </div>
  );
};

export default ShipSelection;
