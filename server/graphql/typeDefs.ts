import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    game(id: ID!): Game!
    games(user: String!): [Game]!
    gameIds(user: String!): [Game]!
    player(id: ID!): Game!
  }

  type Mutation {
    setShips(gameId: ID!, playerShips: GameInput!): Game
    createGame(newGame: GameInput!): Game
  }

  type Coordinates {
    x: Int
    y: Int
  }

  type Cell {
    coordinates: Coordinates
    isHit: Boolean
  }

  type Ship {
    cells: [Cell]!
    isSunk: Boolean
  }

  type Player {
    name: String!
    smallShip: Ship!
    mediumShip: Ship!
    largeShip: Ship!
  }

  type Game {
    _id: ID!
    players: [Player]!
    playersTurn: String!
  }

  input CoordinatesInput {
    x: Int
    y: Int
  }

  input CellInput {
    coordinates: CoordinatesInput
    isHit: Boolean
  }

  input ShipInput {
    cells: [CellInput]
    isSunk: Boolean
  }

  input PlayerInput {
    name: String!
    smallShip: ShipInput!
    mediumShip: ShipInput!
    largeShip: ShipInput!
  }

  input GameInput {
    _id: ID
    players: [PlayerInput]!
    playersTurn: String!
  }
`;

export default typeDefs;
