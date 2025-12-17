import { combineReducers, Action } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import clubReducer from '../slice/clubSlice';
import agendaReducer from '../slice/agendaSlice';
import agendaItemReducer from '../slice/agendaItemSlice';
import meetingsReducer from '../slice/meetingSlice';

const appReducer = combineReducers({
  auth: authReducer,
  clubs: clubReducer,
  agendas: agendaReducer,
  agendaItem: agendaItemReducer,
  meetings: meetingsReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;