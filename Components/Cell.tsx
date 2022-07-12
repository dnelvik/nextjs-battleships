import React from 'react';
import styles from '../styles/Cell.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
  getClickedCell,
  getHoveredCell,
  getPhase,
  getShipType,
  setHoveredCell,
} from '../store/slices/gameStateSlice';
import { Coordinates } from '../store/types';

interface Props {
  x: number;
  y: number;
  setClickedCell: any;
  clickedCell: Coordinates | undefined;
  activeCells: Coordinates[] | undefined;
}

const sizes = {
  Small: [0, 1],
  Medium: [0, 1, 2],
  Large: [0, 1, 2, 3],
};

const Cell = ({ x, y, setClickedCell, clickedCell, activeCells }: Props) => {
  const dispatch = useDispatch();
  const phase = useSelector(getPhase);
  const shipType = useSelector(getShipType);
  const hoveredCell = useSelector(getHoveredCell);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useMemo(() => {
    if ({ x, y } === activeCells) {
      setIsClicked(true);
      console.log('worked');
    }
    if (
      clickedCell?.x === x &&
      sizes[shipType?.sizeName]?.includes(clickedCell?.y - y) &&
      !isClicked
    ) {
      setIsClicked(true);
    }
  }, [activeCells]);

  React.useEffect(() => {
    if (hoveredCell?.x !== x) {
      setIsHovered(false);
    } else if (sizes[shipType?.sizeName]?.includes(hoveredCell?.y - y)) {
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
    if (isClicked) {
      return styles.cell__clicked;
    } else if (isHovered) {
      return styles.cell__hover;
    }
    return styles.cell__clean;
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
