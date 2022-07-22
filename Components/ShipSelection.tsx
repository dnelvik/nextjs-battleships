import React from 'react';
import { useDispatch, useSelector } from '../store/store';
import {
  getPlayerInfo,
  getRotateX,
  setRotateX,
  setShipType,
} from '../store/slices/gameStateSlice';
import { sizes } from '../util/types';
import { dbGetCall, postPlayerShipsToDb } from '../util/databaseUtil';
import { otherPlayersTurnAlert } from '../util/Utils';

const ShipSelection = () => {
  const dispatch = useDispatch();
  const rotate = useSelector(getRotateX);
  const stateInDatabase = useSelector(getPlayerInfo);

  const onClick = (size: 'smallShip' | 'mediumShip' | 'largeShip') => {
    dispatch(setShipType({ sizeName: size, sizeNum: sizes[size].length }));
  };

  const confirmPlacement = async () => {
    const res = await postPlayerShipsToDb(stateInDatabase);
    otherPlayersTurnAlert(dispatch, res.ok);
  };

  const getTest = async () => {
    const res = await dbGetCall('danay', 'Danay');
    console.log(res);
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button className="btn btn-primary" onClick={() => onClick('smallShip')}>
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
      <button className="btn btn-primary" onClick={confirmPlacement}>
        Confirm placement
      </button>
      <button className="btn btn-primary" onClick={getTest}>
        Get Test
      </button>
    </div>
  );
};

export default ShipSelection;
