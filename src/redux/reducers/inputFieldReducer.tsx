import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldsState,
    REGISTER_INPUT_FIELD,
    InputFieldState
} from '../types'

const initialState: InputFieldsState = {
    inputFields: {}
}

export default function inputFieldReducer(state = initialState, action: InputFieldTypes): InputFieldsState {
    const updateFieldIfExists = (uuid: string, property: string, newValue: any) => {
        return {
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
            return {
                inputFields: {
                    ...state.inputFields,
                    [action.payload.uuid]: action.payload
                }
            }

        case SET_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', action.value)

        case SET_FIELD_STATE:
            return {
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
                inputFields: {
                    ...state.inputFields,
                    [action.fieldUuid]: {
                        ...state.inputFields[action.fieldUuid],
                        errors: action.errors,
                        isValid: action.errors.length < 1
                    }
                }
            }

        default:
            return state
    }
}