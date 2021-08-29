import React, { useState, useEffect, useContext, createContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebaseAuth from 'firebase/auth';
import { Route, Redirect } from 'react-router-dom';

const authContext = createContext();
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const auth = firebaseAuth.getAuth();
  const signin = (email, password) =>
    firebaseAuth
      .signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signup = (email, password) =>
    firebaseAuth
      .createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signout = () =>
    firebaseAuth.signOut(auth).then(() => {
      setUser(false);
    });

  const sendPasswordResetEmail = (email) =>
    firebaseAuth.sendPasswordResetEmail(auth, email).then(() => true);

  const confirmPasswordReset = (auth, code, password) =>
    firebaseAuth.confirmPasswordReset(auth, code, password).then(() => true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    isLoading,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <CircularProgress color="secondary" />;
        }
        return auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props?.location },
            }}
          />
        );
      }}
    />
  );
};
