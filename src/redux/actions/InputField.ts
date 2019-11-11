import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldState,
    REGISTER_INPUT_FIELD,
} from '../types'

import { ValidatorError } from '../../modules/wizards/validators/Validator'
import {
    FETCH_SEARCHBOX_OPTIONS, FETCH_SEARCHBOX_OPTIONS_COMPLETED,
    FieldType,
    InputFieldsState,
    REMOVE_FORM_FIELDS,
    UPDATE_FORM_FROM_CONTROLLER,
    UPDATE_FORM_FROM_CONTROLLER_COMPLETED
} from "../types/InputField";
import {FormState} from "../types/Form";
import {SearchOption, SearchOptionGroup} from "../../modules/wizards/inputs/FieldInterfaces";

export function setFieldState(fieldUuid: string, state: InputFieldState): InputFieldTypes {
    return {
        type: SET_FIELD_STATE,
        fieldUuid: fieldUuid,
        payload: state
    }
}

export function setFieldValue(fieldUuid: string, value: FieldType): InputFieldTypes {
    return {
        type: SET_FIELD_VALUE,
        fieldUuid: fieldUuid,
        value: value
    }
}

export function assignFieldToForm(fieldUuid: string, formUuid: string): InputFieldTypes {
    return {
        type: ASSIGN_FORM,
        fieldUuid: fieldUuid,
        formUuid: formUuid,
    }
}

export function clearField(fieldUuid: string): InputFieldTypes {
    return {
        type: CLEAR_FIELD_VALUE,
        fieldUuid: fieldUuid
    }
}

export function setFieldValidationResults(fieldUuid: string, validationResults: ValidatorError[]): InputFieldTypes {
    return {
        type: SET_VALIDATION_RESULTS,
        fieldUuid: fieldUuid,
        errors: validationResults
    }
}

export function registerInputField(inputField: InputFieldState): InputFieldTypes {
    return {
        type: REGISTER_INPUT_FIELD,
        payload: inputField
    }
}

export function removeFormFields(formUuid: string): InputFieldTypes {
    return {
        type: REMOVE_FORM_FIELDS,
        formUuid: formUuid
    }
}

export function updateFormFieldsAction(fieldUuid: string, formUuid: string, inputFields: InputFieldsState, formState: FormState): InputFieldTypes {
    return {
        type: UPDATE_FORM_FROM_CONTROLLER,
        formUuid: formUuid,
        fieldUuid: fieldUuid,
        inputFieldsState: inputFields,
        formState: formState
    }
}

export function updateFormFieldsCompletedAction(payload: InputFieldsState): InputFieldTypes {
    return {
        type: UPDATE_FORM_FROM_CONTROLLER_COMPLETED,
        payload: payload
    }
}

export function fetchSearchBoxOptions(fieldUuid: string, optionsUrl: string, searchText: string) {
    return {
        type: FETCH_SEARCHBOX_OPTIONS,
        fieldUuid: fieldUuid,
        optionsUrl: optionsUrl,
        searchText: searchText
    }
}

export function fetchSearchBoxOptionsCompleted(fieldUuid: string, response: SearchOption[] | SearchOptionGroup[]) {
    return {
        type: FETCH_SEARCHBOX_OPTIONS_COMPLETED,
        fieldUuid: fieldUuid,
        response: response
    }
}