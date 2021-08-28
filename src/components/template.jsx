import React from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Create = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return <div className={classes.root}>YO YOOO</div>;
};

export default hot(module)(Create);
