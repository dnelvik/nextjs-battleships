import React from 'react';
import styles from '../../styles/Grid.module.scss';
import { useDispatch } from '../../store/store';
import {
  setHoveredAttackCell,
  setHoveredPlacementCell,
} from '../../store/slices/gameStateSlice';

interface Props {
  grid: any;
}

const GridRenderer = ({ grid }: Props) => {
  const dispatch = useDispatch();

  const clearHover = () => {
    dispatch(setHoveredPlacementCell(undefined));
    dispatch(setHoveredAttackCell(undefined));
  };
  return (
    <div className={styles.grid} onMouseLeave={clearHover}>
      {grid.map((e: any, idx: number) => {
        return <div key={idx}>{e}</div>;
      })}
    </div>
  );
};

export default GridRenderer;
