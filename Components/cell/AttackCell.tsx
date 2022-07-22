import React from 'react';
import styles from '../../styles/Cell.module.scss';
import Cell from './Cell';
import { attackOtherPlayersCell } from '../../util/databaseUtil';
import { useDispatch, useSelector } from '../../store/store';
import { Coordinates } from '../../util/types';
import { otherPlayersTurnAlert } from '../../util/Utils';
import { getGameName, getPlayerName } from '../../store/slices/gameStateSlice';

interface Props {
  x: number;
  y: number;
}

const AttackCell = ({ x, y }: Props) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const playerName = useSelector(getPlayerName);
  const gameName = useSelector(getGameName);

  const onClick = async () => {
    if (!isClicked) {
      const coord: Coordinates = {
        x,
        y,
      };
      setIsClicked(true);
      const res = await attackOtherPlayersCell(coord, playerName, gameName);
      console.log(await res.json());
      otherPlayersTurnAlert(dispatch, res.ok);
    }
  };

  const setStyle = () => {
    if (isHovered && isClicked) {
      return styles.cell__blocked;
    } else if (isClicked) {
      return styles.cell__clicked;
    } else if (isHovered) {
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
