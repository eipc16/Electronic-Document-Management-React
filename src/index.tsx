import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Alert from 'react-s-alert';
import defaultOptions from './notifications/Notification';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import {Provider as ReduxProvider} from 'react-redux';
import {applyMiddleware, createStore, Reducer, StoreEnhancer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux/reducers/'

import {BrowserRouter as Router} from 'react-router-dom'

import DateFnsUtils from '@date-io/date-fns';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};

const sagaMiddleware = createSagaMiddleware()

function configureStore(reducer: Reducer) {

    const middlewares = [thunkMiddleware, sagaMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer]
    const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

    return createStore(reducer, undefined, composedEnhancers);
}

const store = configureStore(rootReducer);

const Root = () => {
    return (
        <Router>
          <ReduxProvider store={store}>
          <PaperProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <App/>
            </MuiPickersUtilsProvider>
          </PaperProvider>
          <Alert stack={{ limit: 3 }} {...defaultOptions} />
          </ReduxProvider>
        </Router>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
