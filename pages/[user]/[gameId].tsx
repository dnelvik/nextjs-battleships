import React from 'react';
import styles from '../../styles/Home.module.scss';
import ShipSelection from '../../Components/ShipSelection';
import PlacementGrid from '../../Components/grid/PlacementGrid';
import EnemyGrid from '../../Components/grid/EnemyGrid';
import { setPhase } from '../../store/slices/gameStateSlice';
import { useDispatch } from '../../store/store';
import { DatabaseType } from '../../util/types';
import { useRouter } from 'next/router';

interface Props {
  playerData: DatabaseType;
}

const GameId = ({ playerData }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  React.useEffect(() => {
    if (playerData) {
      // dispatch(setPlayer(playerData.player));
      dispatch(setPhase('Attack'));
    }
  }, [dispatch, playerData]);

  return (
    <div className={styles.home}>
      <EnemyGrid mapSize={10} gameId={gameId} />
      <PlacementGrid mapSize={10} gameId={gameId} />
      <ShipSelection />
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const { gameName, playerName } = ctx.query;
  const res = await fetch(
    `http://localhost:3000/api/restapi/?gameName=${gameName}&playerName=${playerName}`
  );
  const data = await res.json();
  console.log(data);
  if (!data) {
    return { notFound: true };
  }
  return { props: { playerData: data[0] } };
}

export default GameId;
