import React from 'react';
import styles from '../../styles/Cell.module.scss';

interface Props {
  className: any;
  onClick: any;
  onHover: any;
}

const Cell = ({ className, onClick, onHover }: Props) => {
  return (
    <div className={styles.cell}>
      <div
        className={className}
        onClick={onClick}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      />
    </div>
  );
};

export default Cell;
