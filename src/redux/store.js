import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import userReducer from './reducer/reducer';

const rootReducer = combineReducers({
  userReducer
  // wareHouseReducer,
  // playBackReducer,
  // notificationReducer,
  // userReducer,
  // reportReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
