import { put, takeEvery } from 'redux-saga/effects';
import {fetchSearchBoxOptionsCompleted, updateFormFieldsCompletedAction} from "../actions/InputField";
import {
    FETCH_SEARCHBOX_OPTIONS,
    UPDATE_FORM_FROM_CONTROLLER,
    UpdateFormFieldsAction, UpdateSearchBoxResultsAction
} from "../types/InputField";
import {services} from "../../context";
import {request, RequestType} from "../../utils/APIUtils";
import {AlertTypes, NotificationBuilder} from "../../notifications/Notification";



function* updateFormAsync(action: UpdateFormFieldsAction) {
    const updatedFields = yield services.wizardService.updateForm(action.inputFieldsState, action.formUuid, action.fieldUuid, action.formState);
    console.log(updatedFields);
    yield put(updateFormFieldsCompletedAction(updatedFields));
}

function* fetchSearchBoxOptionsAsync(action: UpdateSearchBoxResultsAction) {
    const targetUrl = `http://localhost:8080${action.optionsUrl}?searchText=${action.searchText}`;
    const options = yield request({url: targetUrl, method: RequestType.GET})
        .then((response) => { return response;})
        .catch(error => {
            console.error(error);
            new NotificationBuilder().setType(AlertTypes.ERROR).build().show(error.message);
        });
    yield put(fetchSearchBoxOptionsCompleted(action.fieldUuid, options));
}

export function* watchEveryFormUpdate() {
    yield takeEvery(UPDATE_FORM_FROM_CONTROLLER, updateFormAsync);
    yield takeEvery(FETCH_SEARCHBOX_OPTIONS, fetchSearchBoxOptionsAsync);
}