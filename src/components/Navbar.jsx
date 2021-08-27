import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../plugins/auth';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const auth = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <ButtonBase color="inherit" component={Link} to="/">
              {t('global.title')}
            </ButtonBase>
          </Typography>
          {auth.isLoading && <CircularProgress color="secondary" />}
          {auth.user ? (
            <ButtonBase
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              component={Link}
              to={`/users/${auth.user.id}`}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </ButtonBase>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              {t('user.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
