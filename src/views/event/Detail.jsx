import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WebIcon from '@material-ui/icons/Web';
import GroupIcon from '@material-ui/icons/Group';
import { Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  large: {
    marginRight: theme.spacing(2),
  },
  userInfos: {
    display: 'flex',
    alignItems: 'center',
  },
  eventInfos: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  player: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    marginRight: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

const Detail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation('common');
  const event = useSelector((state) => state.event.currentEvent);
  const user = useSelector((state) => state.user.self);
  const [isAuth, setAuth] = useState(false)
  const [spotLeft, setSpotLeft] = useState(0);

  useEffect(() => {
    setAuth(!!user)
  }, [user]);

  useEffect(() => {
    dispatch({ type: 'GET_EVENT', id });
    setSpotLeft(event?.max_players - event?.players.length);
  }, [id, event, dispatch]);

  const joinEvent = () => {
    dispatch({ type: 'JOIN_EVENT', id });
  }

  return (
    <div className={classes.root}>
      <div className={classes.userInfos}>
        <Avatar src={event?.host_avatar} className={classes.large} />
        <small>{t('event.user.host', { name: event?.host_username })}</small>
      </div>
      <img src={event?.media} width="100%" alt="golf" />
      <h1>{event?.title}</h1>
      <div className={classes.eventInfo}>
        <div className={classes.section}>
          <CalendarTodayIcon className={classes.icon} />
          <Typography variant="body2" component="span">
            {event?.when}
          </Typography>
        </div>
        <div className={classes.section}>
          <LocationOnIcon className={classes.icon} />
          <Typography variant="body2" component="a" href="http://google.com">
            {event?.course_name}
          </Typography>
        </div>
        <div className={classes.section}>
          <WebIcon className={classes.icon} />
          <Typography variant="body2" component="a" href={event?.course_url}>
            {event?.course_url}
          </Typography>
        </div>
        <div className={classes.section}>
          <GroupIcon className={classes.icon} />
          <Typography variant="body2" component="p">
            {t('event.spot-left', { amount: spotLeft })}
          </Typography>
        </div>
        <div className={classes.section}>
          <GroupIcon className={classes.icon} />
          {event?.players.map((player) => (
            <ButtonBase key={player?.id} className={classes.player} component={Link} to={`/users/${player?.id}`}>
              <Avatar src={player?.avatar} />
              <Typography variant="body2" component="small">
                {player?.username}
              </Typography>
            </ButtonBase>
          ))}
        </div>
      </div>
      <div>
        <Typography variant="body1" component="p">
          {event?.description}
        </Typography>
      </div>
      <div className={classes.footer}>
        <Button size="big" variant="primary" onClick={joinEvent()}>
          {t('event.join')}
        </Button>
      </div>
    </div>
  );
};

export default Detail;
