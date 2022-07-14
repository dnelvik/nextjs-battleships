export type Coordinates = {
  x?: number;
  y?: number;
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
  sizeName: 'Small' | 'Medium' | 'Large';
  sizeNum: number;
};

export const sizes = {
  Small: [0, 1],
  Medium: [0, 1, 2],
  Large: [0, 1, 2, 3],
};