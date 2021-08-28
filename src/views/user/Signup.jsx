import React, { useMemo, useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../plugins/auth';
import { isRequired, validate } from '../../helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '300px',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const auth = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const errors = useMemo(() => {
    const validator = {
      email(v) {
        return isRequired(v);
      },
      password(v) {
        return isRequired(v);
      },
    };
    return validate(form, validator);
  }, [form]);

  useEffect(() => {
    setHasErrors(Object.values(errors).some((v) => v));
  }, [errors]);

  const login = async () => {
    setIsDirty(true);
    if (hasErrors) return;
    try {
      await auth.signup(form.email, form.password);
      history.push('/');
    } catch (e) {
      // handle login error
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <h1>{t('signup.title')}</h1>
      <FormControl className={classes.form}>
        <TextField
          required
          label="Email"
          error={errors.email && isDirty}
          variant="outlined"
          onChange={(event) => {
            setForm({ ...form, email: event.target.value });
          }}
        />
        <TextField
          label="Password"
          type="password"
          error={errors.password && isDirty}
          autoComplete="current-password"
          variant="outlined"
          onChange={(event) => {
            setForm({ ...form, password: event.target.value });
          }}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={login}
        >
          {t('signup.action')}
        </Button>
      </FormControl>
    </div>
  );
};

export default hot(module)(Signup);
