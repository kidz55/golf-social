import {
  SET_EVENT_LIST, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, SET_CURRENT_EVENT,
} from './types';

export const setEventList = (list) => ({
  type: SET_EVENT_LIST,
  list,
});

export const setCurrentEvent = (event) => ({
  type: SET_CURRENT_EVENT,
  event,
});

export const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

export const deleteEvent = (event) => ({
  type: DELETE_EVENT,
  event,
});
