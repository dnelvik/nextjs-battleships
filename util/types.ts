export type Coordinates = {
  x: number;
  y: number;
};

export type CellType = {
  coordinates: Coordinates;
  isHit?: boolean;
  idx?: number;
};

export type Player = {
  playerName: string;
  smallShip: Ship;
  mediumShip: Ship;
  largeShip: Ship;
};

export type Ship = {
  cells: CellType[];
  isSunk?: boolean;
};

export type ShipType = {
  sizeName: ShipNames;
  sizeNum: number;
};

export type ShipNames = 'smallShip' | 'mediumShip' | 'largeShip';

export type DatabaseType = {
  gameName: string;
  player: Player;
  playersTurn: boolean;
};

export type AlertType = {
  message: string;
  type: 'Warning' | 'Error' | 'Success' | 'Opponents turn' | '';
};

export const sizes = {
  smallShip: [0, 1],
  mediumShip: [0, 1, 2],
  largeShip: [0, 1, 2, 3],
};
