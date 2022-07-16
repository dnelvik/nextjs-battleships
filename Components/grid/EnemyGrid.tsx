import React from 'react';

interface Props {
  msg: string;
  nr: number;
}

const EnemyGrid = ({ msg, nr }: Props) => {
  const message: string = `${msg} ${nr}`;
  return <p>{message}</p>;
};

export default EnemyGrid;
