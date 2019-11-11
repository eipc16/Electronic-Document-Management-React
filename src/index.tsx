import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Alert from 'react-s-alert';
import {getDefaultAlertOptions} from './notifications/Notification';
import {Provider as PaperProvider} from 'react-native-paper';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import {loadAppTheme} from "./configurations/themeConfiguration";
import configureServices from "./configurations/serviceConfiguration";
import {configureStore} from "./configurations/reduxConfiguration";

import context from './context';

import rootReducer from './redux/reducers';
import { Store } from 'redux';
import WizardProvider from "./modules/wizards/WizardProvider";
import ActionBlocker from "./modules/actionblocker/ActionBlocker";

const Root = (props: any) => {
    return (
        <Router>
            <ReduxProvider store={props.store}>
                <PaperProvider theme={props.appTheme}>
                    <WizardProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <App/>
                        </MuiPickersUtilsProvider>
                    </WizardProvider>
                    <Alert stack={{ limit: 3 }} {...props.alertOptions} />
                    <ActionBlocker/>
                </PaperProvider>
            </ReduxProvider>
        </Router>
    )
};

const render = async (store: Store) => {
    const target = document.getElementById('root');
    const theme = loadAppTheme();
    const alertOptions = getDefaultAlertOptions();
    ReactDOM.render(
        <Root
            store={store}
            appTheme={theme}
            alertOptions={alertOptions}
        />, target);
};

(async function init() {
    const store = configureStore(rootReducer);
    const services = await configureServices(store);
    context.registerServices(services);
    await render(store);
    serviceWorker.register();
})();
