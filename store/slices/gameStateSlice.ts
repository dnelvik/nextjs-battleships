import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import {
  AlertType,
  Coordinates,
  DatabaseType,
  ShipType,
} from '../../util/types';
import { initialState } from '../initialState';

export interface GameState {
  playerInfo: DatabaseType;
  gameInfo: {
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
  };
  alert: AlertType;
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setPlayerInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo>
    ) => {
      state.playerInfo = action.payload;
    },
    setGameName: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.gameName>
    ) => {
      state.playerInfo.gameName = action.payload;
    },
    setPlayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.player>
    ) => {
      state.playerInfo.player = action.payload;
    },
    setPlayerName: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.player.playerName>
    ) => {
      state.playerInfo.player.playerName = action.payload;
    },
    setSmallShipsPlayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.player.smallShip>
    ) => {
      state.playerInfo.player.smallShip = action.payload;
    },
    setMediumShipsPlayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.player.mediumShip>
    ) => {
      state.playerInfo.player.mediumShip = action.payload;
    },
    setLargeShipsPlayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.player.largeShip>
    ) => {
      state.playerInfo.player.largeShip = action.payload;
    },
    setPlayersTurn: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.playerInfo.playersTurn>
    ) => {
      state.playerInfo.playersTurn = action.payload;
    },
    setPhase: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.phase>
    ) => {
      state.gameInfo.phase = action.payload;
    },
    setShipType: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.shipType>
    ) => {
      state.gameInfo.shipType = action.payload;
    },
    setClickedAttackCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.clickedAttackCell>
    ) => {
      state.gameInfo.clickedAttackCell = action.payload;
    },
    setHoveredPlacementCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.hoveredPlacementCell>
    ) => {
      state.gameInfo.hoveredPlacementCell = action.payload;
    },
    setHoveredAttackCell: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.hoveredAttackCell>
    ) => {
      state.gameInfo.hoveredAttackCell = action.payload;
    },
    setBlocked: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.blocked>
    ) => {
      state.gameInfo.blocked = action.payload;
    },
    setPlacementConfirmed: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.placementConfirmed>
    ) => {
      state.gameInfo.placementConfirmed = action.payload;
    },
    setIsPlacing: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.isPlacing>
    ) => {
      state.gameInfo.isPlacing = action.payload;
    },
    setRotateX: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.gameInfo.rotateX>
    ) => {
      state.gameInfo.rotateX = action.payload;
    },
    setAlert: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.alert>
    ) => {
      state.alert = action.payload;
    },
    reset: () => initialState,
  },
});

export const getGameName = (state: { gameState: GameState }) =>
  state.gameState.playerInfo.gameName;
export const getPlayer = (state: { gameState: GameState }) =>
  state.gameState.playerInfo.player;
export const getPlayerInfo = (state: { gameState: GameState }) =>
  state.gameState.playerInfo;
export const getSpecifiedShip = (
  state: { gameState: GameState },
  ship: string
) =>
  // @ts-ignore
  state.gameState.playerInfo.player[ship];
export const getPlayersTurn = (state: { gameState: GameState }) =>
  state.gameState.playerInfo.playersTurn;
export const getPlayerName = (state: { gameState: GameState }) =>
  state.gameState.playerInfo.player.playerName;
export const getPhase = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.phase;
export const getShipType = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.shipType;
export const getHoveredPlacementCell = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.hoveredPlacementCell;
export const getHoveredAttackCell = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.hoveredAttackCell;
export const getBlocked = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.blocked;
export const getPlacementConfirmed = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.placementConfirmed;
export const getRotateX = (state: { gameState: GameState }) =>
  state.gameState.gameInfo.rotateX;
export const getAllActiveCells = (state: { gameState: GameState }) => {
  return state.gameState.playerInfo.player?.smallShip.cells
    .concat(state.gameState.playerInfo.player.mediumShip.cells)
    .concat(state.gameState.playerInfo.player.largeShip.cells);
};
export const getIsPlacing = (state: { gameState: GameState }) => {
  return state.gameState.gameInfo.isPlacing;
};
export const getAlert = (state: { gameState: GameState }) => {
  return state.gameState.alert;
};

// Exports all actions
export const {
  setGameName,
  setPlayer,
  setPlayerName,
  setSmallShipsPlayer,
  setMediumShipsPlayer,
  setLargeShipsPlayer,
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
  reset,
  setAlert,
  setPlayerInfo,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
