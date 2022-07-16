import { Coordinates, Ship, ShipType, sizes } from '../store/types';

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
  clickedCell: Coordinates,
  currentCell: Coordinates,
  shipType: ShipType
) => {
  return (
    sizes[shipType?.sizeName]?.includes(clickedCell.y - currentCell.y) ||
    (clickedCell.y + 1 - shipType.sizeNum < 0 &&
      sizes[shipType?.sizeName]?.includes(currentCell.y))
  );
};
