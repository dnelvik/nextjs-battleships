import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    game(id: ID!): Game!
    games(user: String!): [Game]!
    gameIds(user: String!): [Game]!
    player(id: ID!): Game!
  }

  type Mutation {
    setCells(gameId: ID!, playerShips: GameInput!): Game
    createGame(newGame: GameInput!): Game
  }

  type Coordinates {
    x: Int
    y: Int
  }

  type Cell {
    coordinates: Coordinates
    shipType: String
    isHit: Boolean
  }

  type Player {
    name: String!
    cells: [Cell]
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
    shipType: String
    isHit: Boolean
  }

  input PlayerInput {
    name: String!
    cells: [CellInput]
  }

  input GameInput {
    _id: ID
    players: [PlayerInput]!
    playersTurn: String!
  }
`;

export default typeDefs;
