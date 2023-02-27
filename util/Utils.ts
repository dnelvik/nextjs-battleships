import { CellType, Coordinates, ShipType, sizes } from './types';

export const equalCoordinates = (
  coords1: Coordinates,
  coords2: Coordinates
) => {
  return coords1?.x === coords2?.x && coords1?.y === coords2?.y;
};

export const doesShipContainCoordinates = (
  currentShipCells: CellType[],
  currentCoords: Coordinates
) => {
  if (!currentShipCells || !currentCoords) {
    return;
  }
  return currentShipCells.some((e) =>
    equalCoordinates(e.coordinates, currentCoords)
  );
};

export const checkIfCellIsIncludedInShip = (
  shipType: ShipType,
  activeCell: Coordinates,
  currentCell: Coordinates,
  rotateX: boolean
) => {
  const shipSize = sizes[shipType].length;
  const clickedCellAngle = rotateX ? activeCell?.x : activeCell?.y;
  const currentCellAngle = rotateX ? currentCell.x : currentCell.y;
  const clickedCellOtherAngle = !rotateX ? activeCell?.x : activeCell?.y;
  const currentCellOtherAngle = !rotateX ? currentCell.x : currentCell.y;
  return (
    clickedCellOtherAngle === currentCellOtherAngle &&
    (sizes[shipType]?.includes(clickedCellAngle - currentCellAngle) ||
      (clickedCellAngle + 1 - shipSize < 0 &&
        sizes[shipType]?.includes(currentCellAngle)))
  );
};

export const removeTypeNameFromGQLResult = (result: Record<string, any>) => {
  return JSON.parse(
    JSON.stringify(result, (key, value) => {
      if (key === '__typename') return;
      return value;
    })
  );
};

export const getUsersData = (gameData: any, user: string) => {
  if (!gameData || !user) {
    return;
  }
  return gameData.players.filter((player) => player.name === user)[0];
};

export const getEnemyData = (gameData: any, user: string) => {
  if (!gameData || !user) {
    return;
  }
  return gameData.players.filter((player) => player.name !== user)[0];
};

export const isShipSunk = (shipType: ShipType, cells: CellType[]) => {
  return (
    cells.filter((cell) => cell.shipType === shipType && !cell.isHit).length > 0
  );
};

export const isEveryShipSunk = (cells: CellType[]) => {
  return cells.every((cell) => cell.isHit);
};
