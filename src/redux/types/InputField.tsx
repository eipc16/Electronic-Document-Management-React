import { ValidatorError } from '../../wizards/validators/Validator'

import { SearchOption, SearchOptionGroup } from '../../wizards/inputs/SearchField'

export const REGISTER_INPUT_FIELD = 'REGISTER_INPUT_FIELD'
export const SET_FIELD_STATE = 'SET_FORM_FIELD_STATE'
export const SET_FIELD_VALUE = 'SET_FORM_FIELD_VALUE'
export const ASSIGN_FORM = 'ASSIGN_FIELD_TO_FORM'
export const CLEAR_FIELD_VALUE = 'CLEAR_FORM_FIELD_VALUE'
export const SET_VALIDATION_RESULTS = 'SET_FIELD_VALIDATION_RESULTS';
export const IS_FIELD_REGISTERED = 'IS_FIELD_REGISTERED';
export const SEND_FORM_TO_SERVER = 'SEND_FORM_TO_SERVER';

export interface InputFieldState {
    uuid: string;
    formUuid: string;
    type: string;
    name: string;
    label: string;
    value: string | number | boolean | Date | File | SearchOption | null;
    isValid: boolean;
    errors: ValidatorError[];
    options?: SearchOptionGroup[] | SearchOption[];
}

export interface InputFieldsState {
    uuid: string;
    title: string;
    visible: boolean;
    inputFields: {
        [uuid: string]: InputFieldState;
    };
}

interface SetFieldStateAction {
    type: typeof SET_FIELD_STATE;
    fieldUuid: string;
    payload: InputFieldState;
}

interface SetFieldValueAction {
    type: typeof SET_FIELD_VALUE;
    fieldUuid: string;
    value: string | number | boolean | Date | File | SearchOption | null;
}

interface AssignToFormAction {
    type: typeof ASSIGN_FORM;
    fieldUuid: string;
    formUuid: string;
}

interface ClearFieldValueAction {
    type: typeof CLEAR_FIELD_VALUE;
    fieldUuid: string;
}

interface SetValidationResultsAction {
    type: typeof SET_VALIDATION_RESULTS;
    fieldUuid: string;
    errors: ValidatorError[];
}

interface RegisterInputFieldAction {
    type: typeof REGISTER_INPUT_FIELD;
    payload: InputFieldState;
}

interface SendFormAction {
    type: typeof SEND_FORM_TO_SERVER;
}

export type InputFieldTypes = 
    SetFieldStateAction 
    | SetFieldValueAction
    | AssignToFormAction 
    | ClearFieldValueAction 
    | SetValidationResultsAction
    | RegisterInputFieldAction
    | SendFormAction