import {
  SET_EVENT_LIST, SET_CURRENT_EVENT, UPDATE_EVENT, DELETE_EVENT,
} from '../actions/event/types';

const initialState = {
  list: {},
  currentEvent: null,
  eventCount: 0,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_LIST:
      return {
        ...state,
        eventCount: action.list.count,
        list: action.list.rows.reduce((acc, event) => {
          if (state.list[event.id]) {
            acc[event.id] = { ...state.list[event.id], ...event };
            return acc;
          }
          acc[event.id] = event;
          return acc;
        }, {}),
      };
    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.event,
      };
    case DELETE_EVENT: {
      return {
        ...state,
        list: Object.keys(state.list).filter((id) => id !== action.event.id).reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = state.list[key];
          return obj;
        }, {}),
      };
    }
    case UPDATE_EVENT: {
      return {
        ...state,
        list: { ...state.list, [action.event.id]: action.event },
      };
    }
    case 'TASK_REQ_FAILED': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
