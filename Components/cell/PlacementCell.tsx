import React from 'react';
import styles from '../../styles/Cell.module.scss';
import { useDispatch, useSelector } from '../../store/store';
import {
  getAllActiveCells,
  getBlocked,
  getHoveredCell,
  getIsPlacing,
  getShipsPlayer1,
  getShipType,
  setBlocked,
  setHoveredCell,
  setIsPlacing,
} from '../../store/slices/gameStateSlice';
import { CellType, Coordinates } from '../../store/types';
import {
  checkIfCellIsIncludedInShip,
  doesShipsContainCoordinates,
  equalCoordinates,
} from '../../util/Utils';
import Cell from './Cell';

interface Props {
  x: number;
  y: number;
  setClickedCell: any;
  clickedCell: Coordinates | undefined;
  activeCells: Coordinates[] | undefined;
}

const PlacementCell = ({
  x,
  y,
  setClickedCell,
  clickedCell,
  activeCells,
}: Props) => {
  const dispatch = useDispatch();
  const shipType = useSelector(getShipType);
  const hoveredCell = useSelector(getHoveredCell);
  const blocked = useSelector(getBlocked);
  const player = useSelector(getShipsPlayer1);
  const isPlacing = useSelector(getIsPlacing);
  const allActiveCells = useSelector(getAllActiveCells);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  let currentShip = player[shipType?.sizeName];
  const currentCell: CellType = { coordinates: { x, y } };
  let currentCellIsActiveInCurrentShip = doesShipsContainCoordinates(
    currentShip,
    currentCell.coordinates
  );

  React.useMemo(() => {
    const currentCellIsActive: boolean =
      allActiveCells?.filter((e) =>
        equalCoordinates(currentCell.coordinates, e.coordinates)
      ).length > 0;
    if (
      clickedCell?.x === x &&
      checkIfCellIsIncludedInShip(
        clickedCell,
        currentCell.coordinates,
        shipType
      ) &&
      !isClicked
    ) {
      setIsClicked(true);
      dispatch(setIsPlacing(true));
    } else if (!currentCellIsActive) {
      setIsClicked(false);
    }
  }, [activeCells]);

  React.useMemo(() => {
    if (
      hoveredCell?.x === x &&
      checkIfCellIsIncludedInShip(
        hoveredCell,
        currentCell.coordinates,
        shipType
      )
    ) {
      setIsHovered(true);
      isClicked &&
        !currentCellIsActiveInCurrentShip &&
        dispatch(setBlocked(true));
    } else {
      setIsHovered(false);
    }
  }, [hoveredCell]);

  const onClick = () => {
    if (!blocked) {
      setClickedCell(currentCell.coordinates);
    }
  };

  const setStyle = () => {
    if (!isHovered) {
      return isClicked ? styles.cell__clicked : styles.cell__clean;
    } else if (!isClicked) {
      return isHovered ? styles.cell__hover : styles.cell__clean;
    } else {
      if (isPlacing) {
        return styles.cell__clicked;
      }
      return currentCellIsActiveInCurrentShip
        ? styles.cell__hover
        : styles.cell__blocked;
    }
  };

  const onHover = (enter: boolean) => {
    if (enter) {
      dispatch(setHoveredCell(currentCell.coordinates));
    } else {
      dispatch(setBlocked(false));
      dispatch(setIsPlacing(false));
    }
  };

  return (
    <>
      <Cell className={setStyle()} onClick={onClick} onHover={onHover} />
    </>
  );
};

export default PlacementCell;
