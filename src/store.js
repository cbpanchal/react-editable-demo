import { createStore, combineReducers, compose } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({ form });

const reduxStore = createStore(
  rootReducer,
  {},
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f),
);

export default reduxStore;
