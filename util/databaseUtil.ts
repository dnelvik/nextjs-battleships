import { CellType, Coordinates, DatabaseType } from './types';
import { Simulate } from 'react-dom/test-utils';
import play = Simulate.play;

export const postPlayerShipsToDb = async (data: DatabaseType) => {
  return await fetch('http://localhost:3000/api/playerapi', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, playersTurn: false }),
  });
};

export const dbGetCall = async (gameName: string, playerName: string) => {
  const res = await fetch(
    `http://localhost:3000/api/playerapi/?gameName=${gameName}&playerName=${playerName}&onlyGame=false`
  );
  return await res.json();
};

export const attackOtherPlayersCell = async (
  coord: Coordinates,
  playerName: string,
  gameName: string
) => {
  return await fetch('http://localhost:3000/api/opponentapi', {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coord: coord,
      playerName: playerName,
      gameName: gameName,
    }),
  });
};
