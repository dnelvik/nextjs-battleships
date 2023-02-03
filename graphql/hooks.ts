import { useQuery } from '@apollo/client';
import { FIND_USERS_GAME_IDS } from './queries';

export const useGameIds = (user: string) => {
  const { loading, error, data } = useQuery(FIND_USERS_GAME_IDS, {
    variables: { user },
  });

  return {
    gameIds: data?.gameIds,
    loading,
    error: Boolean(error),
  };
};
