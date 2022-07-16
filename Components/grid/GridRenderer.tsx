import React from 'react';
import styles from '../../styles/Grid.module.scss';
import { useDispatch } from '../../store/store';
import { setHoveredCell } from '../../store/slices/gameStateSlice';

interface Props {
  grid: any;
}

const GridRenderer = ({ grid }: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.grid}
      onMouseLeave={() => dispatch(setHoveredCell(undefined))}>
      {grid.map((e: any, idx: number) => {
        return <div key={idx}>{e}</div>;
      })}
    </div>
  );
};

export default GridRenderer;
