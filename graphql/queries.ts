import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const API_URL = 'http://localhost:3000/api/graphql';

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const FIND_USERS_GAMES_QUERY = gql`
  query FindUsersGamesQuery($user: String!) {
    games(user: $user) {
      _id
      players {
        name
      }
      playersTurn
    }
  }
`;
