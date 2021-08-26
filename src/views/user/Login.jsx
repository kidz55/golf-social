import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return <div className={classes.root}>YO</div>;
};

export default Login;
