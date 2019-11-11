import { ValidatorError } from '../../modules/wizards/validators/Validator'
import {SearchOption, SearchOptionGroup} from "../../modules/wizards/inputs/FieldInterfaces";
import {FetchState, FormState} from "./Form";

export const UPDATE_FORM_FROM_CONTROLLER = 'UPDATE_FIELDS_FROM_CONTROLLER';
export const REGISTER_INPUT_FIELD = 'REGISTER_INPUT_FIELD'
export const SET_FIELD_STATE = 'SET_FORM_FIELD_STATE'
export const SET_FIELD_VALUE = 'SET_FORM_FIELD_VALUE'
export const ASSIGN_FORM = 'ASSIGN_FIELD_TO_FORM'
export const CLEAR_FIELD_VALUE = 'CLEAR_FORM_FIELD_VALUE'
export const SET_VALIDATION_RESULTS = 'SET_FIELD_VALIDATION_RESULTS';
export const REMOVE_FORM_FIELDS = 'REMOVE_FORM_FIELDS';

export const UPDATE_FORM_FROM_CONTROLLER_COMPLETED = 'UPDATE_FIELDS_FROM_CONTROLLER_COMPLETED';

export const FETCH_SEARCHBOX_OPTIONS_ONGOING = "FETCH_SEARCHBOX_OPTIONS_ONGOING";
export const FETCH_SEARCHBOX_OPTIONS = "FETCH_SEARCHBOX_OPTIONS";
export const FETCH_SEARCHBOX_OPTIONS_COMPLETED = "FETCH_SEARCHBOX_OPTIONS_COMPLETED";

export type FieldType = string | number | boolean | Date | File | SearchOption | null;

export interface InputFieldState {
    uuid: string;
    formUuid: string;
    type: string;
    controllerUrl: string | null;
    name: string;
    label: string;
    value: FieldType;
    isValid: boolean;
    isRequired: boolean;
    isVisible: boolean;
    validators: string[];
    defaultValue: FieldType;
    placeholder: FieldType;
    errors: ValidatorError[];
    optionsUrl?: string;
    options?: SearchOptionGroup[] | SearchOption[];
}

export interface InputFieldsState {
    [uuid: string]: InputFieldState;
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

interface RemoveFormFieldsAction {
    type: typeof REMOVE_FORM_FIELDS;
    formUuid: string;
}

export interface UpdateFormFieldsAction {
    type: typeof UPDATE_FORM_FROM_CONTROLLER;
    formUuid: string;
    fieldUuid: string;
    inputFieldsState: InputFieldsState;
    formState: FormState;
}

export interface UpdateFormFieldsCompletedAction {
    type: typeof UPDATE_FORM_FROM_CONTROLLER_COMPLETED;
    payload: InputFieldsState;
}

export interface UpdateSearchBoxResultsAction {
    type: typeof FETCH_SEARCHBOX_OPTIONS;
    fieldUuid: string;
    optionsUrl: string;
    searchText: string;
}

export interface UpdateSearchBoxResultsCompleteAction {
    type: typeof FETCH_SEARCHBOX_OPTIONS_COMPLETED;
    fieldUuid: string;
    response: SearchOption[] | SearchOptionGroup[];
    fetchStatus: FetchState;
}

export type InputFieldTypes = 
    SetFieldStateAction 
    | SetFieldValueAction
    | AssignToFormAction 
    | ClearFieldValueAction 
    | SetValidationResultsAction
    | RegisterInputFieldAction
    | RemoveFormFieldsAction
    | UpdateFormFieldsAction
    | UpdateFormFieldsCompletedAction
    | UpdateSearchBoxResultsCompleteAction
    | UpdateSearchBoxResultsAction;