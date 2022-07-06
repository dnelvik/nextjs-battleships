import React from 'react';
import styles from '../styles/Cell.module.scss';

interface Props {
  x: number;
  y: number;
}

const Cell = ({ x, y }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const onClick = () => {
    setIsClicked(true);
    console.log(`x: ${x} y: ${y}`);
  };

  return (
    <div
      className={isClicked ? styles.cell__clicked : styles.cell}
      onClick={onClick}
    />
  );
};

export default Cell;
