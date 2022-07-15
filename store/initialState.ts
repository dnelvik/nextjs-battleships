import { GameState } from './slices/gameStateSlice';
import { PlayerShips } from './types';

const initialPlayer: PlayerShips = {
  smallShip: {
    cells: [],
    isSunk: false,
  },
  mediumShip: {
    cells: [],
    isSunk: false,
  },
  largeShip: {
    cells: [],
    isSunk: false,
  },
};

export const initialState: GameState = {
  player1: initialPlayer,
  player2: initialPlayer,
  playersTurn: true,
  phase: 'Placement',
  grid: undefined,
  clickedCell: undefined,
  hoveredCell: undefined,
  blocked: false,
  placementConfirmed: false,
  shipType: {
    sizeName: 'smallShip',
    sizeNum: 2,
  },
};
