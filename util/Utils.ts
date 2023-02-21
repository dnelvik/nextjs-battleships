import { Coordinates, Ship, ShipType, sizes } from './types';

export const equalCoordinates = (
  coords1: Coordinates,
  coords2: Coordinates
) => {
  return coords1?.x === coords2?.x && coords1?.y === coords2?.y;
};

export const doesShipsOverlap = (ship1: Ship, ship2: Ship) => {
  if (!ship1 || !ship2) {
    return;
  }
  const ship1Cells = ship1.cells;
  const ship2Cells = ship2.cells;
  return ship1Cells.some((e) =>
    ship2Cells.some((x) => equalCoordinates(x.coordinates, e.coordinates))
  );
};

export const doesShipsContainCoordinates = (ship: Ship, coord: Coordinates) => {
  if (!ship || !coord) {
    return;
  }
  return ship.cells.some((e) => equalCoordinates(e.coordinates, coord));
};

export const checkIfCellIsIncludedInShip = (
  shipType: ShipType,
  activeCell: Coordinates,
  currentCell: Coordinates,
  rotateX: boolean
) => {
  const clickedCellAngle = rotateX ? activeCell?.x : activeCell?.y;
  const currentCellAngle = rotateX ? currentCell.x : currentCell.y;
  const clickedCellOtherAngle = !rotateX ? activeCell?.x : activeCell?.y;
  const currentCellOtherAngle = !rotateX ? currentCell.x : currentCell.y;
  return (
    clickedCellOtherAngle === currentCellOtherAngle &&
    (sizes[shipType?.sizeName]?.includes(clickedCellAngle - currentCellAngle) ||
      (clickedCellAngle + 1 - shipType.sizeNum < 0 &&
        sizes[shipType?.sizeName]?.includes(currentCellAngle)))
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
