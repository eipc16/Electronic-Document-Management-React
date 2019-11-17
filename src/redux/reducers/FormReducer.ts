import { FormState, FormActions, InputFieldsState } from '../types'
import {
    FETCH_WIZARD_COMPLETED,
    FETCH_WIZARD_STARTED,
    FetchState,
    HIDE_FORM,
    REGISTER_FORM,
    SEND_FORM,
    SHOW_FORM
} from "../types/Form";
import {services} from "../../context";

const initialState: FormState = {
    uuid: '',
    title: '',
    endpoint: '',
    visible: false,
    fields: []
};

const sendForm = (state: FormState, formUuid: string, fields: InputFieldsState) => {
    services.wizardService.sendForm(state, formUuid, fields);
    return state;
}

export default function formReducer(state = initialState, action: FormActions, inputFields: InputFieldsState) {
    switch(action.type) {
        case REGISTER_FORM:
            return {
                ...state,
                uuid: action.formData.uuid,
                title: action.formData.title,
                endpoint: action.formData.endpoint,
                visible: action.formData.visible? action.formData.visible : false,
                fields: action.formData.fields
            };
        case SHOW_FORM:
            return {...state, visible: true};
        case HIDE_FORM:
            return {...state, visible: false};
        case SEND_FORM:
            return sendForm(state, action.formUuid, inputFields);
        case FETCH_WIZARD_STARTED:
            return {
                ...state,
                fetchStatus: FetchState.ONGOING
            };
        case FETCH_WIZARD_COMPLETED:
            return {
                ...action.payload,
                fetchStatus: action.fetchState
            }
    }

    return state
}