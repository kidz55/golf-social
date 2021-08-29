import React, { useMemo, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from '../../plugins/auth';
import { getUser } from '../../store/actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  header: {},
  userInfos: {},
  avatar: {
    margin: theme.spacing(4),
    width: theme.spacing(50),
    height: theme.spacing(50),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const auth = useAuth();

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.self);
  const isLoading = useSelector(({ user }) => user.isLoading);
  const error = useSelector(({ user }) => user.error);

  const { t } = useTranslation('common');
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  const isUser = useMemo(() => auth?.user?.uid === id, [id, auth]);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar alt="Remy Sharp" className={classes.avatar} />

        <p>is loading {JSON.stringify(isLoading)}</p>
        <p> {JSON.stringify(user)}</p>

        <div className={classes.userInfos}></div>
      </div>
    </div>
  );
};

export default hot(module)(Profile);
