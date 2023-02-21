import React from 'react';
import styles from '../styles/Grid.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
    getPhase,
    getPlayer,
    getRotateX, setPhase,
    setRotateX,
    setShipType,
} from '../store/slices/gameStateSlice';
import { sizes } from '../util/types';
import { useMutation } from '@apollo/client';
import { SET_USERS_SHIPS } from '../graphql/queries';
import { removeTypeNameFromGQLResult } from '../util/Utils';

const ShipSelection = ({ gameData, user, gameId }) => {
  const dispatch = useDispatch();
  const rotate = useSelector(getRotateX);
  const player = useSelector(getPlayer);
  const phase = useSelector(getPhase);
  const [mutate, { loading, error }] = useMutation(SET_USERS_SHIPS);

  const onClickShipSize = (size: 'smallShip' | 'mediumShip' | 'largeShip') => {
    dispatch(setShipType({ sizeName: size, sizeNum: sizes[size].length }));
  };

  const onClickPost = () => {
      if (phase === 'Placement') {
          const newPlayers = gameData?.players.map((p: any) =>
              p.name === user ? player : p
          );
          const otherPlayersName = gameData?.players.find(
              (p: any) => p.name !== user
          ).name;
          const newGame = {
              ...gameData,
              players: newPlayers,
              playersTurn: otherPlayersName,
          };

          const newVar = removeTypeNameFromGQLResult(newGame);
          mutate({
              variables: {
                  gameId,
                  playerShips: newVar,
              },
          }).then(() => dispatch(setPhase('Attack')));
      } else {

      }
  };

  return (
    <div className={styles.shipButtonsContainer}>
      <button
        className="btn btn-primary"
        onClick={() => onClickShipSize('smallShip')}>
        Small Ship
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onClickShipSize('mediumShip')}>
        Medium Ship
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onClickShipSize('largeShip')}>
        Large Ship
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch(setRotateX(!rotate))}>
        Rotate
      </button>
      <button className="btn btn-primary" onClick={onClickPost}>
        Confirm placement
      </button>
    </div>
  );
};

export default ShipSelection;
