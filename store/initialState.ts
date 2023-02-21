import { GameState } from './slices/gameStateSlice';
import { Player } from '../util/types';

export const initialPlayer: Player = {
  name: '',
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

export const createModelFromInitialPlayer = (player: string, opponent: string) => {
  return {
    players: [
      {
        ...initialPlayer,
        name: player
      },
      {
        ...initialPlayer,
        name: opponent
      }
    ],
    playersTurn: player
  }
};

export const initialState: GameState = {
  player: initialPlayer,
  playersTurn: true,
  phase: 'Placement',
  shipType: {
    sizeName: 'smallShip',
    sizeNum: 2,
  },
  hoveredPlacementCell: undefined,
  hoveredAttackCell: undefined,
  clickedPlacementCell: undefined,
  clickedAttackCell: undefined,
  blocked: false,
  placementConfirmed: false,
  isPlacing: false,
  rotateX: false,
};
