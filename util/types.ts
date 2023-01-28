export type Coordinates = {
  x: number;
  y: number;
};

export type CellType = {
  coordinates: Coordinates;
  isHit?: boolean;
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
  sizeName: 'smallShip' | 'mediumShip' | 'largeShip';
  sizeNum: number;
};

export type DatabaseType = {
  players: Player;
  playersTurn: boolean;
};

export const sizes = {
  smallShip: [0, 1],
  mediumShip: [0, 1, 2],
  largeShip: [0, 1, 2, 3],
};

export const mockdata = (gameName: string, playerName: string) => {
  return {
    gameName: gameName,
    ships: {
      playerName: playerName,
      smallShip: {
        cells: [
          {
            coordinates: { x: 0, y: 0 },
            isHit: false,
          },
          {
            coordinates: { x: 0, y: 1 },
            isHit: false,
          },
        ],
        isSunk: false,
      },
      mediumShip: {
        cells: [
          {
            coordinates: { x: 1, y: 0 },
            isHit: false,
          },
          {
            coordinates: { x: 1, y: 1 },
            isHit: false,
          },
          {
            coordinates: { x: 1, y: 2 },
            isHit: false,
          },
        ],
        isSunk: false,
      },
      largeShip: {
        cells: [
          {
            coordinates: { x: 2, y: 0 },
            isHit: false,
          },
          {
            coordinates: { x: 2, y: 1 },
            isHit: false,
          },
          {
            coordinates: { x: 2, y: 2 },
            isHit: false,
          },
          {
            coordinates: { x: 2, y: 3 },
            isHit: false,
          },
        ],
        isSunk: false,
      },
    },
    playersTurn: false,
  };
};
