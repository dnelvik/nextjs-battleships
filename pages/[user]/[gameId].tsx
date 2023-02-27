import React from 'react';
import styles from '../../styles/Home.module.scss';
import ShipSelection from '../../Components/ShipSelection';
import PlacementGrid from '../../Components/grid/PlacementGrid';
import EnemyGrid from '../../Components/grid/EnemyGrid';
import {
  setPhase,
  setPlayer,
  setPlayersTurn,
} from '../../store/slices/gameStateSlice';
import { useDispatch } from '../../store/store';
import { useRouter } from 'next/router';
import { client, FIND_GAME_QUERY } from '../../graphql/queries';
import { getUsersData } from '../../util/Utils';

const GameId = ({ gameData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId, user } = router.query;

  React.useEffect(() => {
    if (gameData) {
      const usersData = getUsersData(gameData, user);
      dispatch(setPlayer(usersData));
      dispatch(setPlayersTurn(gameData?.playersTurn === user));
      dispatch(
        usersData?.cells.length > 0 ? setPhase('Attack') : setPhase('Placement')
      );
    }
  }, [dispatch, gameData]);

  return (
    <div className={styles.home}>
      <EnemyGrid mapSize={10} gameId={gameId} gameData={gameData} user={user} />
      <PlacementGrid mapSize={10} gameId={gameId} />
      <ShipSelection gameData={gameData} user={user} gameId={gameId} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const gameData = await client.query({
    query: FIND_GAME_QUERY,
    variables: {
      id: context.params.gameId,
    },
  });

  console.log(gameData?.data?.game?.players[0]);

  return {
    props: { gameData: gameData.data.game }, // will be passed to the page component as props
  };
}

export default GameId;
