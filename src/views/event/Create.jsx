import React from 'react';
import { hot } from 'react-hot-loader';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const Create = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [course, setCourse] = React.useState('');
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const createEvent = () => {
    // TODO create a party
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.form}>
        <InputLabel id="golf-selection">{t('event.create.course')}</InputLabel>
        <Select
          labelId="golf-selection"
          value={course}
          onChange={handleCourseChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField
          id="datetime-event"
          label={t('event.create.when')}
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="nb-people-event"
          label={t('event.create.players')}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          rows={4}
          multiline
          label={t('event.create.description')}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <div className={classes.footer}>
        <Button color="secondary" variant="contained" onClick={createEvent}>
          {t('event.create.create')}
        </Button>
      </div>
    </div>
  );
};

export default hot(module)(Create);
