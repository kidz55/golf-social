import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../plugins/auth';
import { ButtonBase } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  createButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { pathname } = useLocation();
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
          {pathname !== '/event/create' && (
            <Button
              color="secondary"
              variant="contained"
              className={classes.createButton}
              component={Link}
              to="/event/create"
            >
              {t('event.create.create')}
            </Button>
          )}
          {auth.user && !auth.isLoading && (
            <ButtonBase
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              component={Link}
              to={`/users/${auth.user.uid}`}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </ButtonBase>
          )}
          {!auth.user && !auth.isLoading && (
            <Button color="inherit" component={Link} to="/login">
              {t('user.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
