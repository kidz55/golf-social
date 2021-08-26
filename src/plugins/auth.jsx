import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const authContext = createContext();
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) =>
    firebaseAuth
      .getAuth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signup = (email, password) =>
    firebaseAuth
      .getAuth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signout = () =>
    firebaseAuth
      .getAuth()
      .signOut()
      .then(() => {
        setUser(false);
      });

  const sendPasswordResetEmail = (email) =>
    firebaseAuth
      .getAuth()
      .sendPasswordResetEmail(email)
      .then(() => true);

  const confirmPasswordReset = (code, password) =>
    firebaseAuth
      .getAuth()
      .confirmPasswordReset(code, password)
      .then(() => true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
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
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

export const PrivateRoute = ({ component, path }) => {
  const auth = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) =>
        auth.user ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
