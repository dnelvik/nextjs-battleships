export type Coordinates = {
  x: number;
  y: number;
};

export type CellType = {
  coordinates: Coordinates;
  isHit?: boolean;
};

export type PlayerShips = {
  smallShip: Ship;
  mediumShip: Ship;
  largeShip: Ship;
};

export type Ship = {
  cells: CellType[];
  isSunk?: boolean;
};

export type ShipType = {
  sizeName: 'smallShip' | 'mediumShip' | 'largeShip';
  sizeNum: number;
};

export const sizes = {
  smallShip: [0, 1],
  mediumShip: [0, 1, 2],
  largeShip: [0, 1, 2, 3],
};
