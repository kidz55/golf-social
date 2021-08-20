import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  CardActionArea,
} from '@material-ui/core';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.error,
  },
}));

const EventPreview = ({ event }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const spotLeft = event.players.length - event.max_players + 1;
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/event/${event.id}`}>
        <CardHeader
          avatar={(
            <Avatar aria-label="player Name" />
            )}
          title={event.title}
          subheader={event.when}
        />
        <CardMedia
          className={classes.media}
          image={event.media}
          title="golf picture"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.description}
          </Typography>
          <Chip icon={<FaceIcon />} label={t('event.spot-left', { amount: spotLeft })} />
        </CardContent>
        { spotLeft > 0 && (
        <CardActions>
          <Button size="big" color="primary">
            {t('event.join')}
          </Button>
        </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
};

EventPreview.propTypes = {
  event: propTypes.shape({
    description: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    players: propTypes.arrayOf(propTypes.shape({})).isRequired,
    title: propTypes.string.isRequired,
    media: propTypes.string.isRequired,
    when: propTypes.string.isRequired,
    max_players: propTypes.number.isRequired,
  }).isRequired,
};

export default EventPreview;
