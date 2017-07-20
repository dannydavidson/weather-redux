import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export function instance({ cities }, { reducer }) {
  const initialState = {
    cities,
    isLoading: false,
    hasError: false,
    forecasts: {}
  };
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
