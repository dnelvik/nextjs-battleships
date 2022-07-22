import { GameState } from './slices/gameStateSlice';
import { DatabaseType } from '../util/types';

export const initialPlayerInfo: DatabaseType = {
  gameName: '',
  player: {
    playerName: '',
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
  },
  playersTurn: true,
};

export const initialState: GameState = {
  playerInfo: initialPlayerInfo,
  gameInfo: {
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
  },
  alert: {
    message: '',
    type: '',
  },
};
