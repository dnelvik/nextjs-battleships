export type Coordinates = {
  x: number;
  y: number;
};

export type CellType = {
  coordinates: Coordinates;
  isHit: boolean;
};

export type PlayerShips = {
  smallShip: Ship;
  mediumShip: Ship;
  largeShip: Ship;
};

export type Ship = {
  cells: CellType[];
  isSunk: boolean;
};

export type ShipType = {
  sizeName: 'Small' | 'Medium' | 'Large';
  sizeNum: number;
};
