import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { deleteEvent, createEvent, updateEvent } from '../../store/sagas';
import EventPreview from './Preview';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  item: {
    padding: theme.spacing(2),
    display: 'flex',
    width: '100%',
    maxWidth: 340,
  },
}));

const Home = () => {
  const classes = useStyles();
  const events = useSelector((state) => Object.values(state.event.list));
  const eventCount = useSelector((state) => state.eventCount);
  const dispatch = useDispatch();
  const pages = useMemo(() => Math.ceil(eventCount / 10), [eventCount]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_EVENTS', query });
  }, [query, dispatch]);

  const storeUpdateEvent = (game) => {
    dispatch(updateEvent(game));
  };

  const storeCreateEvent = async (game) => {
    dispatch(createEvent(game));
  };

  const storeDeleteEvent = (game) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete Game?')) {
      dispatch(deleteEvent(game));
    }
  };

  return (
    <Grid container className={classes.root}>
      {events.map((game) => (
        <Grid key={game.id} className={classes.item} item>
          <EventPreview
            event={game}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
