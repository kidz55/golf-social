import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
  return <div className={classes.content}>YO</div>;
};

export default Home;
