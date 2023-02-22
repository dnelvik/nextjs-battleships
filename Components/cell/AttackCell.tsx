import React from 'react';
import styles from '../../styles/Cell.module.scss';
import Cell from './Cell';
import {client, FIND_GAME_QUERY, SET_USERS_SHIPS} from "../../graphql/queries";
import {useSelector} from "react-redux";
import {getPhase, getPlayersTurn} from "../../store/slices/gameStateSlice";
import {equalCoordinates, getEnemyData, removeTypeNameFromGQLResult} from "../../util/Utils";
import {Coordinates} from "../../util/types";
import {useMutation} from "@apollo/client";

const AttackCell = ({gameData, user, x, y, gameId}) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const playersTurn = useSelector(getPlayersTurn);
  const phase = useSelector(getPhase);
  const coords: Coordinates = {x, y};
  const [mutate, { loading, error }] = useMutation(SET_USERS_SHIPS);

  const onClick = () => {
    if (phase !== 'Attack') {
      return;
    }
    const enemy = getEnemyData(gameData, user);
    const { cells, name } = enemy;
    if (!isClicked) {
      setIsClicked(true);
      const newEnemyCells = cells.map(cell => equalCoordinates(cell.coordinates, coords)
          ? { ...cell, isHit: true }
          : cell);
      const newEnemy = {
        ...enemy,
        cells: newEnemyCells
      }
      const newPlayers = gameData?.players.map((p: any) =>
          p.name === name ? newEnemy : p
      );

      const newGame = {
        ...gameData,
        players: newPlayers,
        playersTurn: name,
      };
      const newVar = removeTypeNameFromGQLResult(newGame);

      mutate({
        variables: {
          gameId,
          playerShips: newVar,
        },
      }).then(() => console.log(newVar))

    }
  };

  const setStyle = () => {
    if (isHovered && isClicked) {
      return styles.cell__blocked;
    } else if (isClicked) {
      return styles.cell__clicked;
    } else if (isHovered && phase === 'Attack') {
      return styles.cell__hover;
    } else {
      return styles.cell__clean;
    }
  };

  const onHover = (enter: boolean) => {
    setIsHovered(enter);
  };

  return (
    <>
      <Cell className={setStyle()} onClick={onClick} onHover={onHover} />
    </>
  );
};

export default AttackCell;
