import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    game(id: ID!): Game!
    games(user: String!): [Game]!
    gameIds(user: String!): [Game]!
    userShips(id: ID!, name: String!): Player!
    player(id: ID!): Game!
    playerShip(id: ID!, name: String!): Player
  }

  type Mutations {
    updateGame: String
  }

  type Coordinates {
    x: Int!
    y: Int!
  }

  type Cell {
    coordinates: Coordinates!
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
`;

export default typeDefs;
