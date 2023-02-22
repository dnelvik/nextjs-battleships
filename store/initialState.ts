import { GameState } from './slices/gameStateSlice';
import { Player } from '../util/types';

export const initialPlayer: Player = {
  name: '',
  cells: []
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
  shipType: 'smallShip',
  hoveredPlacementCell: undefined,
  hoveredAttackCell: undefined,
  clickedPlacementCell: undefined,
  clickedAttackCell: undefined,
  blocked: false,
  placementConfirmed: false,
  isPlacing: false,
  rotateX: false,
};
