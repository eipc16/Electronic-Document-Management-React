import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldsState,
    REGISTER_INPUT_FIELD,
} from '../types'
import {
    FETCH_SEARCHBOX_OPTIONS_COMPLETED,
    InputFieldState,
    REMOVE_FORM_FIELDS,
    UPDATE_FORM_FROM_CONTROLLER,
    UPDATE_FORM_FROM_CONTROLLER_COMPLETED
} from "../types/InputField";
import {services} from "../../context";
import {FormState} from "../types/Form";

const initialState: InputFieldsState = {};

// const sendFormToServer = (state: InputFieldsState) => {
//     const fields: any = []

//     Object.entries(state.inputFields).forEach(entry => {
//         fields.push({
//             id: entry[0],
//             value: entry[1].value
//         })
//     })

//     const payload = {
//         form: state.uuid,
//         endpoint: state.endpoint,
//         fields: fields
//     }

//     console.log(payload)
// }

export default function inputFieldReducer(state = initialState, action: InputFieldTypes, formState: FormState): InputFieldsState {
    const updateFieldIfExists = (uuid: string, property: string, newValue: any) => {
        return {
            ...state,
            [uuid]: {
                ...state[uuid],
                [property]: newValue
            }
        }
    };

    const getFieldsWithoutForm = (formUuid: string) => {
        return Object.values(state)
            .filter((field: InputFieldState) => field.formUuid !== formUuid)
            .reduce((object, value) => ({...object, [value.uuid]: value}), {});
    };

    switch(action.type) {
        case REGISTER_INPUT_FIELD:
            if(state[action.payload.uuid] !== undefined) {
                return state;
            }
            return {
                ...state,
                [action.payload.uuid]: action.payload
            };
        case UPDATE_FORM_FROM_CONTROLLER_COMPLETED:
            return {
                ...state,
                ...action.payload
            };
        case SET_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', action.value);
        case SET_FIELD_STATE:
            return {
                ...state,
                [action.fieldUuid]: action.payload
            };
        case ASSIGN_FORM:
            return updateFieldIfExists(action.fieldUuid, 'formUuid', action.formUuid);
        case CLEAR_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', null);
        case SET_VALIDATION_RESULTS:
            return {
                ...state,
                [action.fieldUuid]: {
                    ...state[action.fieldUuid],
                    errors: action.errors,
                    isValid: action.errors.length < 1
                }
            };
        case REMOVE_FORM_FIELDS:
            return getFieldsWithoutForm(action.formUuid);
        case FETCH_SEARCHBOX_OPTIONS_COMPLETED:
            return {
                ...state,
                [action.fieldUuid]: {
                    ...state[action.fieldUuid],
                    options: action.response
                }
            }
        default:
            return state
    }
}