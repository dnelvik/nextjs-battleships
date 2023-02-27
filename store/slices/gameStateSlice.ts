import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, Player, ShipType } from '../../util/types';
import { initialState } from '../initialState';

export interface GameState {
  player: Player;
  playersTurn: boolean;
  phase: 'Placement' | 'Attack';
  shipType: ShipType;
  hoveredPlacementCell: Coordinates | undefined;
  hoveredAttackCell: Coordinates | undefined;
  clickedPlacementCell: Coordinates | undefined;
  clickedAttackCell: Coordinates | undefined;
  blocked: boolean;
  placementConfirmed: boolean;
  isPlacing: boolean;
  rotateX: boolean;
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setPlayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player>
    ) => {
      state.player = action.payload;
    },
    setCells: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player.cells>
    ) => {
      state.player.cells = action.payload;
    },
    setPlayersTurn: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playersTurn>
    ) => {
      state.playersTurn = action.payload;
    },
    setPhase: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.phase>
    ) => {
      state.phase = action.payload;
    },
    setShipType: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.shipType>
    ) => {
      state.shipType = action.payload;
    },
    setClickedAttackCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.clickedAttackCell>
    ) => {
      state.clickedAttackCell = action.payload;
    },
    setHoveredPlacementCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.hoveredPlacementCell>
    ) => {
      state.hoveredPlacementCell = action.payload;
    },
    setHoveredAttackCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.hoveredAttackCell>
    ) => {
      state.hoveredAttackCell = action.payload;
    },
    setBlocked: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.blocked>
    ) => {
      state.blocked = action.payload;
    },
    setPlacementConfirmed: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.placementConfirmed>
    ) => {
      state.placementConfirmed = action.payload;
    },
    setIsPlacing: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isPlacing>
    ) => {
      state.isPlacing = action.payload;
    },
    setRotateX: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.rotateX>
    ) => {
      state.rotateX = action.payload;
    },
  },
});

export const getPlayer = (state: { gameState: GameState }) =>
  state.gameState.player;
export const getCurrentShipCells = (state: { gameState: GameState }) =>
  state.gameState.player.cells?.filter(
    (cell) => cell.shipType === state.gameState.shipType
  );
export const getPlayersTurn = (state: { gameState: GameState }) =>
  state.gameState.playersTurn;
export const getPhase = (state: { gameState: GameState }) =>
  state.gameState.phase;
export const getShipType = (state: { gameState: GameState }) =>
  state.gameState.shipType;
export const getHoveredPlacementCell = (state: { gameState: GameState }) =>
  state.gameState.hoveredPlacementCell;
export const getHoveredAttackCell = (state: { gameState: GameState }) =>
  state.gameState.hoveredAttackCell;
export const getBlocked = (state: { gameState: GameState }) =>
  state.gameState.blocked;
export const getPlacementConfirmed = (state: { gameState: GameState }) =>
  state.gameState.placementConfirmed;
export const getRotateX = (state: { gameState: GameState }) =>
  state.gameState.rotateX;
export const getAllActiveCells = (state: { gameState: GameState }) => {
  return state.gameState.player.cells;
};
export const getIsPlacing = (state: { gameState: GameState }) => {
  return state.gameState.isPlacing;
};

// Exports all actions
export const {
  setPlayer,
  setPlayersTurn,
  setPhase,
  setShipType,
  setClickedAttackCell,
  setHoveredPlacementCell,
  setHoveredAttackCell,
  setBlocked,
  setPlacementConfirmed,
  setIsPlacing,
  setRotateX,
  setCells,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
