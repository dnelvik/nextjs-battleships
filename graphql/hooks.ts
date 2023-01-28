import { useQuery } from '@apollo/client';
import { FIND_USERS_GAMES_QUERY } from './queries';

export const useUsersGames = (user: string) => {
  const { loading, error, data } = useQuery(FIND_USERS_GAMES_QUERY, {
    variables: { user },
  });

  return {
    games: data?.games,
    loading,
    error: Boolean(error),
  };
};
