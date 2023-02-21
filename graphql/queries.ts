import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const API_URL = 'http://localhost:3000/api/graphql';

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const COORDINATES_FRAGMENT = gql`
  fragment CoordinatesFragment on Coordinates {
    x
    y
  }
`;

const CELL_FRAGMENT = gql`
  ${COORDINATES_FRAGMENT}
  fragment CellFragment on Cell {
    coordinates {
      ...CoordinatesFragment
    }
    isHit
  }
`;

const SHIP_FRAGMENT = gql`
  ${CELL_FRAGMENT}
  fragment ShipFragment on Ship {
    cells {
      ...CellFragment
    }
    isSunk
  }
`;

const PLAYER_FRAGMENT = gql`
  ${SHIP_FRAGMENT}
  fragment PlayerFragment on Player {
    name
    smallShip {
      ...ShipFragment
    }
    mediumShip {
      ...ShipFragment
    }
    largeShip {
      ...ShipFragment
    }
  }
`;

const GAME_FRAGMENT = gql`
  ${PLAYER_FRAGMENT}
  fragment GameFragment on Game {
    _id
    players {
      ...PlayerFragment
    }
    playersTurn
  }
`;

export const FIND_USERS_GAME_IDS = gql`
  ${GAME_FRAGMENT}
  query FindUsersGameIds($user: String!) {
    gameIds(user: $user) {
      ...GameFragment
    }
  }
`;

export const FIND_GAME_QUERY = gql`
  ${PLAYER_FRAGMENT}
  query FindUserGameQuery($id: ID!) {
    game(id: $id) {
      _id
      players {
        ...PlayerFragment
      }
      playersTurn
    }
  }
`;

export const FIND_USER_SHIPS_QUERY = gql`
  ${PLAYER_FRAGMENT}
  query FindUserShipsQuery($id: ID!) {
    player(id: $id) {
      players {
        ...PlayerFragment
      }
    }
  }
`;

export const SET_USERS_SHIPS = gql`
  ${GAME_FRAGMENT}
  mutation SetUsersShips($gameId: ID!, $playerShips: GameInput!) {
    playerShips: setShips(gameId: $gameId, playerShips: $playerShips) {
      ...GameFragment
    }
  }
`;

export const CREATE_GAME = gql`
  ${PLAYER_FRAGMENT}
  mutation CreateGame($newGame: GameInput!) {
    newGame: createGame(newGame: $newGame) {
      players {
        ...PlayerFragment
      }
      playersTurn
    }
  }
`;
