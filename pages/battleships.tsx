import React from 'react';
import styles from '../styles/Home.module.scss';
import ShipSelection from '../Components/ShipSelection';
import PlacementGrid from '../Components/grid/PlacementGrid';
import EnemyGrid from '../Components/grid/EnemyGrid';
import {
  reset,
  setGameName,
  setPhase,
  setPlayerInfo,
  setPlayerName,
} from '../store/slices/gameStateSlice';
import { useDispatch } from '../store/store';
import { DatabaseType } from '../util/types';
import NotificationModal from '../Components/modals/NotificationModal';

interface Names {
  gameName: string;
  playerName: string;
}

interface Props {
  playerData?: DatabaseType;
  names?: Names;
}

const Battleships = ({ playerData, names }: Props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!playerData?.player) {
      dispatch(reset());
    }
    if (names) {
      dispatch(setPlayerName(names.playerName));
      dispatch(setGameName(names.gameName));
    }
    if (playerData?.player) {
      dispatch(setPlayerInfo(playerData));
      dispatch(setPhase('Attack'));
    }
  }, [playerData, names]);

  return (
    <>
      <NotificationModal />
      <div className={styles.home}>
        <EnemyGrid mapSize={10} />
        <PlacementGrid mapSize={10} />
        <ShipSelection />
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const { gameName, playerName } = ctx.query;
  const res = await fetch(
    `http://localhost:3000/api/playerapi/?gameName=${gameName}&playerName=${playerName}`
  );
  const data = await res.json();
  return {
    props: {
      playerData: data[0] ? data[0] : {},
      names: { gameName, playerName },
    },
  };
}

export default Battleships;
