import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const GamePreview = () => {
  const classes = useStyles();
  return <div className={classes.root}>YO</div>;
};

export default GamePreview;
