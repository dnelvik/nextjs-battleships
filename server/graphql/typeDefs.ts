import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    game: Game!
    games(user: String!): [Game]!
    players: [Player]
  }

  type Mutations {
    updateGame: String
  }

  type Coordinates {
    x: Int
    y: Int
    isHit: Boolean
  }

  type Ship {
    cells: [Coordinates]
    isSunk: Boolean
  }

  type Player {
    name: String
    smallShip: Ship
    mediumShip: Ship
    largeShip: Ship
  }

  type Game {
    _id: ID
    players: [Player]
    playersTurn: String
  }
`;

export default typeDefs;
