import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useGameIds } from '../../graphql/hooks';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const { loading, error, gameIds } = useGameIds(user as string);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  const createHref = (id: string, user: any) => {
    return `/${user}/${id}`;
  };

  return (
    <div>
      {gameIds?.map((game: any) => (
        <Link href={createHref(game._id, user)} key={game._id}>
          <Button>
            {game.players[0].name} vs {game.players[1].name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default UserPage;
