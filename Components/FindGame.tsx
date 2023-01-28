import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const FindGame = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleClick = (data: any) => {
    const { playerName } = data;
    playerName ? router.push(`${playerName}`) : '';
  };

  return (
    <form onSubmit={handleSubmit((data) => handleClick(data))}>
      <div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Name
            </span>
          </div>
          <input
            {...register('playerName')}
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div className={styles.home__buttons}>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Find game
        </button>
      </div>
    </form>
  );
};

export default FindGame;
