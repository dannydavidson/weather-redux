import React from 'react';
import ReactDom from 'react-dom';
import { connect, Provider } from 'react-redux';

import { instance as ioInstance } from './io';
import { instance as storeInstance } from './state/store';
import { instance as actionsInstance } from './state/actions';
import { instance as reducerInstance } from './state/reducer';
import { instance as selectorsInstance } from './state/selectors';
import { utcOffset } from './utils';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Layout from './ui/layouts/VerticalTwoPane';
import CitySelector from './ui/containers/CitySelector';
import FiveDayViewer from './ui/containers/FiveDayViewer';

export function init({ cities, mountElement, ioConfig }) {

  // initialize logger (console for demo purposes)
  const logger = console;

  // initialize singleton data access instance
  const io = ioInstance(ioConfig, { fetch, logger, utcOffset });

  // initialize action creators
  const { actions, actionTypes } = actionsInstance({ logger, io });

  // initialize reducer
  const reducer = reducerInstance({ logger, actionTypes });

  // initialize selectors
  const selectors = selectorsInstance({ logger });

  // initialize redux store
  const store = storeInstance({ cities }, { reducer });

  // initialize layout component
  const LayoutComponent = Layout({ logger });

  // initialize connected containers
  const CitySelectorComponent = CitySelector({ logger, actions, selectors, connect });
  const FiveDayViewerComponent = FiveDayViewer({ logger, actions, selectors, connect });

  // setup touch event handling (material-ui dep)
  injectTapEventPlugin();

  // render layout in provider with the two connected components injected
  ReactDom.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <LayoutComponent
          top={<CitySelectorComponent />}
          bottom={<FiveDayViewerComponent />}
        />
      </MuiThemeProvider>
    </Provider>,
    mountElement
  );

  // load default city
  store.dispatch(actions.loadCity(cities[0].id));
}
