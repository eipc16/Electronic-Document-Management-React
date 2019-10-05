import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldState,
    REGISTER_INPUT_FIELD
} from '../types'

import { ValidatorError } from '../../wizards/validators/Validator'

export function setFieldState(fieldUuid: string, state: InputFieldState): InputFieldTypes {
    return {
        type: SET_FIELD_STATE,
        fieldUuid: fieldUuid,
        payload: state
    }
}

export function setFieldValue(fieldUuid: string, value: string | number | boolean | Date | File | null): InputFieldTypes {
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