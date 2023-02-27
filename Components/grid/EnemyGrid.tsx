import React from 'react';
import GridRenderer from './GridRenderer';
import AttackCell from '../cell/AttackCell';

interface Props {
  mapSize: number;
  gameId: string | string[] | undefined;
  user: string | string[] | undefined;
  gameData: any;
}

const createEnemyGrid = (
  mapSize: number,
  gameData: any,
  user: string,
  gameId: any
) => {
  let gridArray = Array(mapSize);
  for (let x = 0; x < mapSize; x++) {
    gridArray[x] = Array(mapSize);
    for (let y = 0; y < mapSize; y++) {
      gridArray[x][y] = (
        <AttackCell
          key={`${x}${y}`}
          gameData={gameData}
          user={user}
          x={x}
          y={y}
          gameId={gameId}
        />
      );
    }
  }
  return gridArray;
};

const EnemyGrid = ({ mapSize, gameData, user, gameId }: Props) => {
  const grid = createEnemyGrid(mapSize, gameData, user, gameId);

  return (
    <>
      <GridRenderer grid={grid} />
    </>
  );
};

export default EnemyGrid;
