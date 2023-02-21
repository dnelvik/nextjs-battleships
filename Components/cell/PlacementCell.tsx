import React from 'react';
import styles from '../../styles/Cell.module.scss';
import { useDispatch, useSelector } from '../../store/store';
import {
  getAllActiveCells,
  getBlocked,
  getHoveredPlacementCell,
  getIsPlacing,
  getRotateX,
  getPlayer,
  getShipType,
  setBlocked,
  setHoveredPlacementCell,
  setIsPlacing,
  getPhase,
} from '../../store/slices/gameStateSlice';
import { CellType, Coordinates } from '../../util/types';
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
  const hoveredCell = useSelector(getHoveredPlacementCell);
  const blocked = useSelector(getBlocked);
  const player = useSelector(getPlayer);
  const isPlacing = useSelector(getIsPlacing);
  const phase = useSelector(getPhase);
  const rotateX = useSelector(getRotateX);
  const allActiveCells = useSelector(getAllActiveCells);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  let currentShip = player[shipType?.sizeName];
  const currentCell: CellType = { coordinates: { x, y }, isHit: false };
  let currentCellIsActiveInCurrentShip = doesShipsContainCoordinates(
    currentShip,
    currentCell.coordinates
  );

  // Sets active cells to clicked if game is already active
  React.useEffect(() => {
    if (phase === 'Attack') {
      const currentCellIsActive: boolean =
        allActiveCells?.filter((e) =>
          equalCoordinates(currentCell.coordinates, e.coordinates)
        ).length > 0;
      currentCellIsActive && setIsClicked(true);
    }
  }, [allActiveCells, player]);

  // Sets cell to clicked if included
  React.useMemo(() => {
    const currentCellIsActive: boolean =
      allActiveCells?.filter((e) =>
        equalCoordinates(currentCell.coordinates, e.coordinates)
      ).length > 0;
    if (
      clickedCell &&
      checkIfCellIsIncludedInShip(
        shipType,
        clickedCell,
        currentCell.coordinates,
        rotateX
      ) &&
      !isClicked
    ) {
      setIsClicked(true);
      dispatch(setIsPlacing(true));
    } else if (!currentCellIsActive) {
      setIsClicked(false);
    }
  }, [activeCells]);

  // Sets cell to hovered if included
  React.useMemo(() => {
    if (
      hoveredCell &&
      checkIfCellIsIncludedInShip(
        shipType,
        hoveredCell,
        currentCell.coordinates,
        rotateX
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
    if (!blocked && phase === 'Placement') {
      setClickedCell(currentCell.coordinates);
    }
  };

  const setStyle = () => {

    if (!isHovered) {
      return isClicked ? styles.cell__clicked : styles.cell__clean;
    } else if (!isClicked) {
      if (phase === 'Attack') {
        return styles.cell__blocked
      }
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
      dispatch(setHoveredPlacementCell(currentCell.coordinates));
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
