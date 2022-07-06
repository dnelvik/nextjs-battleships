import React from 'react';
import Grid from '../../Components/Grid';
import styles from '../../styles/Home.module.scss';

const form = () => {
  return (
    <div className={styles.home}>
      <Grid mapSize={10} />
    </div>
  );
};

export default form;
