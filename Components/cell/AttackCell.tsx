import React from 'react';
import styles from '../../styles/Cell.module.scss';
import Cell from './Cell';
import {useRouter} from "next/router";
import {client, FIND_GAME_QUERY} from "../../graphql/queries";
import {isPlayersTurn} from "../../util/databaseUtil";

const AttackCell = ({gameData}) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();
  const { user } = router;
  const otherPlayer = gameData?.players.find(
      (p: any) => p.name !== user
  );

  const onClick = () => {
    if (!isClicked && isPlayersTurn(gameData, user)) {
      setIsClicked(true);
    }
  };

  const setStyle = () => {
    if (isHovered && isClicked) {
      return styles.cell__blocked;
    } else if (isClicked) {
      return styles.cell__clicked;
    } else if (isHovered) {
      return styles.cell__hover;
    } else {
      return styles.cell__clean;
    }
  };

  const onHover = (enter: boolean) => {
    setIsHovered(enter);
  };

  return (
    <>
      <Cell className={setStyle()} onClick={onClick} onHover={onHover} />
    </>
  );
};

export default AttackCell;

export async function getServerSideProps(context) {
  const gameData = await client.query({
    query: FIND_GAME_QUERY,
    variables: {
      id: context.params.gameId,
    },
  });

  return {
    props: { gameData: gameData.data.game }, // will be passed to the page component as props
  };
}