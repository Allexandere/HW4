import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from '@redux-saga/core';

import rootReducer from './reducers/rootReducer.js';


export const saga = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(saga),
);
