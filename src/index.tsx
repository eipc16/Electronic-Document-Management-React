import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Alert from 'react-s-alert';
import defaultOptions from './notifications/Notification';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers'

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

const store = createStore(rootReducer)

const Root = () => (
  <ReduxProvider store={store}>
    <PaperProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
        <Alert stack={{ limit: 3 }} {...defaultOptions} />
      </MuiPickersUtilsProvider>
    </PaperProvider>
  </ReduxProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
