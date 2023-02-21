import React from 'react';
import GridRenderer from './GridRenderer';
import AttackCell from '../cell/AttackCell';

interface Props {
  mapSize: number;
  gameId: string | string[] | undefined;
  gameData: any;
}

const createEnemyGrid = (mapSize: number, gameData: any) => {
  let gridArray = Array(mapSize);
  for (let x = 0; x < mapSize; x++) {
    gridArray[x] = Array(mapSize);
    for (let y = 0; y < mapSize; y++) {
      gridArray[x][y] = <AttackCell key={`${x}${y}`} gameData={gameData} />;
    }
  }
  return gridArray;
};

const EnemyGrid = ({ mapSize, gameData }: Props) => {
  const grid = createEnemyGrid(mapSize, gameData);

  return (
    <>
      <GridRenderer grid={grid} />
    </>
  );
};

export default EnemyGrid;
