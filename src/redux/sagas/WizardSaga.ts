import { takeEvery, put, all } from 'redux-saga/effects';

import {request, RequestType} from "../../utils/APIUtils";
import {FormProps, InputField} from "../../modules/wizards/WizardInterfaces";
import {AlertTypes, NotificationBuilder} from "../../notifications/Notification";
import {fetchWizardActionFinished, fetchWizardActionStarted, setCurrentForm, showForm} from "../actions/Form";
import {FETCH_WIZARD, FetchState, FetchWizardAction} from "../types/Form";
import {services} from "../../context";
import {registerInputField} from "../actions/InputField";
import {switchBlockWall} from "../actions/BlockWall";

function* fetchWizardFromServer(action: FetchWizardAction) {
    yield put(fetchWizardActionStarted());
    yield put(switchBlockWall(true));
    yield put(showForm());
    const data = yield request({
        url: action.url,
        method: RequestType.GET
    }).then((form: FormProps) => {
        return {
            form: {
                uuid: form.uuid, title: form.title, visible: true, endpoint: form.endpoint,
                fields: services.wizardService
                    .transformFieldsToNames(form.fields)
            },
            fields: form.fields.map((field: InputField) => {
                return {
                    ...field,
                    value: field.defaultValue,
                    isValid: true
                }
            }),
            fetchState: FetchState.COMPLETED
        }
    }).catch(error => {
        new NotificationBuilder()
            .setType(AlertTypes.ERROR)
            .build()
            .show(error.message);
        return {
            fetchState: FetchState.ERROR
        }
    });
    yield put(setCurrentForm(data.form, action.onSubmit, action.onUpdate));
    yield all(data.fields.map((field: any) => put(registerInputField(field))));
    yield put(fetchWizardActionFinished(data.form, data.fetchState));
}

export function* watchEveryWizardAction() {
    yield takeEvery(FETCH_WIZARD, fetchWizardFromServer)
}