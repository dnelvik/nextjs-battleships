import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/forms/form');
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <h2 className={styles.home__title}>Verdens kuleste nettside</h2>
        <div className={styles.home__buttons}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}>
            Primary
          </button>
          <button type="button" className="btn btn-secondary">
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
