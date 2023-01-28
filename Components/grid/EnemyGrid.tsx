import React from 'react';
import GridRenderer from './GridRenderer';
import AttackCell from '../cell/AttackCell';

interface Props {
  mapSize: number;
  gameId: string | string[] | undefined;
}

const createEnemyGrid = (mapSize: number) => {
  let gridArray = Array(mapSize);
  for (let x = 0; x < mapSize; x++) {
    gridArray[x] = Array(mapSize);
    for (let y = 0; y < mapSize; y++) {
      gridArray[x][y] = <AttackCell key={`${x}${y}`} />;
    }
  }
  return gridArray;
};

const EnemyGrid = ({ mapSize }: Props) => {
  const grid = createEnemyGrid(mapSize);

  return (
    <>
      <GridRenderer grid={grid} />
    </>
  );
};

export default EnemyGrid;
