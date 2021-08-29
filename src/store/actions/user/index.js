import { SET_USER, SET_ERROR, SET_LOADING, GET_USER } from './types';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const getUser = (id) => ({
  type: GET_USER,
  id,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});
export const setLoading = (isLoading: Boolean) => ({
  type: SET_LOADING,
  isLoading,
});
