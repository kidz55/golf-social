import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGame, createGame, updateGame } from '../../store/sagas';
import GamePreview from './GamePreview';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  const games = useSelector((state) => Object.values(state.sport.list));
  const gameCount = useSelector((state) => state.gameCount);
  const dispatch = useDispatch();
  const pages = useMemo(() => Math.ceil(gameCount / 10), [gameCount]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_GAMES', query });
  }, [query, dispatch]);

  const storeUpdateGame = (game) => {
    dispatch(updateGame(game));
  };

  const storeCreateGame = async (game) => {
    dispatch(createGame(game));
  };

  const storeDeleteGame = (game) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete Game?')) {
      dispatch(deleteGame(game));
    }
  };

  return (
    <div className={classes.root}>

      {games.map((game) => (
        <GamePreview
          key={game.id}
          task={game}
        />
      ))}
    </div>
  );
};

export default Home;
