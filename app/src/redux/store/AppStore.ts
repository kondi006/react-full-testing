import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

export type AppState = ReturnType<typeof rootReducer>;

const compose = composeWithDevTools({});

const store =
  createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  );

export default store;
