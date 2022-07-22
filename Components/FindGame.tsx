import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const FindGame = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleClick = (data: any) => {
    const { gameName, playerName } = data;
    gameName && playerName
      ? router.push(
          `/battleships?gameName=${gameName}&playerName=${playerName}`
        )
      : '';
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
            required
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              GameName
            </span>
          </div>
          <input
            {...register('gameName')}
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
        </div>
      </div>
      <div className={styles.home__buttons}>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Find game
        </button>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Start new game
        </button>
      </div>
    </form>
  );
};

export default FindGame;
