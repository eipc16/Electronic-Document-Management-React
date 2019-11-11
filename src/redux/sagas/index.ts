import {watchEveryFormUpdate} from "./InputFieldSaga";
import { all } from 'redux-saga/effects'
import {ReduxStore} from "../../utils/ReduxUtils";
import {watchEveryWizardAction} from "./WizardSaga";

export * from './DocumentsSaga'

export default function* rootSaga(store: ReduxStore) {

    yield all([
        watchEveryFormUpdate(),
        watchEveryWizardAction()
    ])
}