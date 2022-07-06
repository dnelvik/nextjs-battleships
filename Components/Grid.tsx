import React from 'react';
import Cell from './Cell';
import styles from '../styles/Grid.module.scss';

interface Props {
  mapSize: number;
}

type Ship = {
  short: 2;
  middle: 3;
  long: 4;
};

const Grid = ({ mapSize }: Props) => {
  let gridArray = Array(mapSize);

  for (let x = 0; x < mapSize; x++) {
    gridArray[x] = Array(mapSize);
    for (let y = 0; y < mapSize; y++) {
      gridArray[x][y] = <Cell key={`${x}${y}`} x={x} y={y} />;
    }
  }

  return (
    <div className={styles.grid}>
      {gridArray.map((e, idx) => {
        return <div key={idx}>{e}</div>;
      })}
    </div>
  );
};

export default Grid;
