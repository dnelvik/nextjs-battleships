
export const isPlayersTurn = (gameData: any, user: string) => {
    return gameData?.playersTurn === user;
}

export const allEnemyCells = (gameData: any, enemy: string) => {
    const enemyPlayer = gameData.players.filter(player => player.name === enemy);

    return null;
}