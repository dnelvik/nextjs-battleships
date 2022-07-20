import React from 'react';
import styles from '../../styles/Cell.module.scss';
import Cell from './Cell';

const AttackCell = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const onClick = () => {
    if (!isClicked) {
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
