import {watchEveryFormUpdate} from "./InputFieldSaga";
import { all } from 'redux-saga/effects'
import {ReduxStore} from "../../utils/ReduxUtils";
import {watchEveryWizardAction} from "./WizardSaga";
import {watchFlowChartActions} from "./FlowChartSaga";
import {watchDocumentActions} from "./DocumentsSaga";

export * from './DocumentsSaga'

export default function* rootSaga(store: ReduxStore) {

    yield all([
        watchEveryFormUpdate(),
        watchEveryWizardAction(),
        watchFlowChartActions(),
        watchDocumentActions()
    ])
}