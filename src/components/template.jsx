import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return <div className={classes.navbar}>YO</div>;
};

export default Navbar;
