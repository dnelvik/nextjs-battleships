import React from 'react';
import styles from '../styles/Cell.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
  getAllActiveCells,
  getHoveredCell,
  getPhase,
  getShipType,
  setHoveredCell,
} from '../store/slices/gameStateSlice';
import { CellType, Coordinates } from '../store/types';
import { checkIfCellIsIncluded } from '../util/Utils';

interface Props {
  x: number;
  y: number;
  setClickedCell: any;
  clickedCell: Coordinates | undefined;
  activeCells: Coordinates[] | undefined;
}

const Cell = ({ x, y, setClickedCell, clickedCell, activeCells }: Props) => {
  const dispatch = useDispatch();
  const phase = useSelector(getPhase);
  const shipType = useSelector(getShipType);
  const hoveredCell = useSelector(getHoveredCell);
  const allActiveCell = useSelector(getAllActiveCells);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useMemo(() => {
    if (
      clickedCell?.x === x &&
      checkIfCellIsIncluded(clickedCell, { x, y }, shipType) &&
      !isClicked
    ) {
      setIsClicked(true);
    }
  }, [activeCells]);

  React.useMemo(() => {
    if (
      hoveredCell?.x === x &&
      checkIfCellIsIncluded(hoveredCell, { x, y }, shipType)
    ) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [hoveredCell]);

  const onClick = () => {
    setClickedCell({ x, y });
    if (phase === 'Placement') {
    }
  };

  const setStyle = () => {
    const currentCell: CellType = { coordinates: { x, y } };
    const activeCellsLonger: boolean =
      allActiveCell?.filter(
        (e) => JSON.stringify(currentCell) === JSON.stringify(e)
      ).length > 0;
    if (isClicked && activeCellsLonger) {
      return styles.cell__clicked;
    } else if (isHovered) {
      return styles.cell__hover;
    } else {
      return styles.cell__clean;
    }
  };

  const onHover = (enter: boolean) => {
    setIsHovered(enter);
    enter && dispatch(setHoveredCell({ x, y }));
  };

  return (
    <div className={styles.cell}>
      <div
        className={setStyle()}
        onClick={onClick}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => false}
      />
    </div>
  );
};

export default Cell;
