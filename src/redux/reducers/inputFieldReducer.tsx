import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldsState,
    REGISTER_INPUT_FIELD,
    SEND_FORM_TO_SERVER,
    InputFieldState
} from '../types'
import { sendForm } from '../actions';

const initialState: InputFieldsState = {
    uuid: '',
    title: '',
    visible: false,
    inputFields: {}
}

const sendFormToServer = (state: InputFieldsState) => {
    const fields: any = []

    Object.entries(state.inputFields).forEach(entry => {
        fields.push({
            id: entry[0],
            value: entry[1].value
        })
    })

    const payload = {
        form: state.uuid,
        fields: fields
    }

    console.log(payload)
}

export default function inputFieldReducer(state = initialState, action: InputFieldTypes): InputFieldsState {
    const updateFieldIfExists = (uuid: string, property: string, newValue: any) => {
        return {
            ...state,
            inputFields: {
                ...state.inputFields,
                [uuid]: {
                    ...state.inputFields[uuid],
                    [property]: newValue
                }
            }
        }
    }
    
    switch(action.type) {
        case REGISTER_INPUT_FIELD:
            if(state.inputFields[action.payload.uuid] != undefined) {
                return state;
            }

            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    [action.payload.uuid]: action.payload
                }
            }

        case SET_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', action.value)

        case SET_FIELD_STATE:
            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    [action.fieldUuid]: action.payload
                }
            }
        case ASSIGN_FORM:
            return updateFieldIfExists(action.fieldUuid, 'formUuid', action.formUuid)

        case CLEAR_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', null)

        case SET_VALIDATION_RESULTS:
            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    [action.fieldUuid]: {
                        ...state.inputFields[action.fieldUuid],
                        errors: action.errors,
                        isValid: action.errors.length < 1
                    }
                }
            }
        case SEND_FORM_TO_SERVER:
            sendFormToServer(state)
            return state
        default:
            return state
    }
}