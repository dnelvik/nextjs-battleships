import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, PlayerShips, ShipType } from '../types';
import { initialState } from '../initialState';

export interface GameState {
  player1: PlayerShips;
  player2: PlayerShips;
  playersTurn: boolean;
  phase: 'Placement' | 'Attack';
  shipType: ShipType;
  grid: any;
  hoveredCell: Coordinates | undefined;
  clickedCell: Coordinates | undefined;
  blocked: boolean;
  placementConfirmed: boolean;
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setShipsPlayer1: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player1>
    ) => {
      state.player1 = action.payload;
    },
    setSmallShipsPlayer1: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player1.smallShip>
    ) => {
      state.player1.smallShip = action.payload;
    },
    setMediumShipsPlayer1: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player1.mediumShip>
    ) => {
      state.player1.mediumShip = action.payload;
    },
    setLargeShipsPlayer1: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player1.largeShip>
    ) => {
      state.player1.largeShip = action.payload;
    },
    setShipsPlayer2: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.player2>
    ) => {
      state.player2 = action.payload;
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
    setGrid: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.grid>
    ) => {
      state.grid = action.payload;
    },
    setClickedCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.clickedCell>
    ) => {
      state.clickedCell = action.payload;
    },
    setHoveredCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.hoveredCell>
    ) => {
      state.hoveredCell = action.payload;
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
  },
});

// A small helper of user state for `useSelector` function.
export const getShipsPlayer1 = (state: { gameState: GameState }) =>
  state.gameState.player1;
export const getShipsPlayer2 = (state: { gameState: GameState }) =>
  state.gameState.player2;
export const getSpecifiedShip = (
  state: { gameState: GameState },
  ship: string
) =>
  // @ts-ignore
  state.gameState.player1[ship];
export const getPlayersTurn = (state: { gameState: GameState }) =>
  state.gameState.playersTurn;
export const getPhase = (state: { gameState: GameState }) =>
  state.gameState.phase;
export const getShipType = (state: { gameState: GameState }) =>
  state.gameState.shipType;
export const getGrid = (state: { gameState: GameState }) =>
  state.gameState.grid;
export const getClickedCell = (state: { gameState: GameState }) =>
  state.gameState.clickedCell;
export const getHoveredCell = (state: { gameState: GameState }) =>
  state.gameState.hoveredCell;
export const getBlocked = (state: { gameState: GameState }) =>
  state.gameState.blocked;
export const getPlacementConfirmed = (state: { gameState: GameState }) =>
  state.gameState.placementConfirmed;
export const getAllActiveCells = (state: { gameState: GameState }) => {
  return state.gameState.player1.smallShip.cells
    .concat(state.gameState.player1.mediumShip.cells)
    .concat(state.gameState.player1.largeShip.cells);
};

// Exports all actions
export const {
  setShipsPlayer1,
  setShipsPlayer2,
  setSmallShipsPlayer1,
  setMediumShipsPlayer1,
  setLargeShipsPlayer1,
  setPlayersTurn,
  setPhase,
  setShipType,
  setGrid,
  setClickedCell,
  setHoveredCell,
  setBlocked,
  setPlacementConfirmed,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
