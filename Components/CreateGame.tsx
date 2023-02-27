import React from 'react';
import styles from '../styles/Home.module.scss';
import { useForm } from 'react-hook-form';
import { createModelFromInitialPlayer } from '../store/initialState';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../graphql/queries';
import { useRouter } from 'next/router';

const CreateGame = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [mutate] = useMutation(CREATE_GAME);

  const handleClick = (data: any) => {
    const { playerName, opponentName } = data;
    if (playerName) {
      mutate({
        variables: {
          newGame: createModelFromInitialPlayer(playerName, opponentName),
        },
      }).then(() => router.push(`${playerName}`));
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleClick(data))}>
      <div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Player
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
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Opponent
            </span>
          </div>
          <input
            {...register('opponentName')}
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div className={styles.home__buttons}>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Create game
        </button>
      </div>
    </form>
  );
};

export default CreateGame;
