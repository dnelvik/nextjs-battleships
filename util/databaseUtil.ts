import { mockdata } from './types';

export const dbPostCall = async (gameName: string, playerName: string) =>
  await fetch('http://localhost:3000/api/restapi', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mockdata(gameName, playerName)),
  });

export const dbGetCall = async (gameName: string, playerName: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restapi/?gameName=${gameName}&playerName=${playerName}`
  );
  return await res.json();
};
