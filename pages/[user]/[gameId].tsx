import React from 'react';
import styles from '../../styles/Home.module.scss';
import ShipSelection from '../../Components/ShipSelection';
import PlacementGrid from '../../Components/grid/PlacementGrid';
import EnemyGrid from '../../Components/grid/EnemyGrid';
import { setPhase, setPlayer } from '../../store/slices/gameStateSlice';
import { useDispatch } from '../../store/store';
import { useRouter } from 'next/router';
import { client, FIND_USER_SHIPS_QUERY } from '../../graphql/queries';

const GameId = ({ usersData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  React.useEffect(() => {
    if (usersData) {
      dispatch(setPlayer(usersData));
      dispatch(setPhase('Attack')); // hardkodet, må være dynamisk
    }
  }, [dispatch, usersData]);

  return (
    <div className={styles.home}>
      <EnemyGrid mapSize={10} gameId={gameId} />
      <PlacementGrid mapSize={10} gameId={gameId} />
      <ShipSelection />
    </div>
  );
};

export async function getServerSideProps(context) {
  const result = await client.query({
    query: FIND_USER_SHIPS_QUERY,
    variables: {
      id: context.params.gameId,
    },
  });

  const usersData = result?.data.player.players.filter(
    (player) => player.name === context.params.user
  )[0];

  return {
    props: { usersData }, // will be passed to the page component as props
  };
}

export default GameId;
