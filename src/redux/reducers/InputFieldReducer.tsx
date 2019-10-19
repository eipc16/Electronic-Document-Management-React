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

const initialState: InputFieldsState = {}

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

export default function inputFieldReducer(state = initialState, action: InputFieldTypes): InputFieldsState {
    const updateFieldIfExists = (uuid: string, property: string, newValue: any) => {
        return {
            ...state,
            [uuid]: {
                ...state[uuid],
                [property]: newValue
            }
        }
    }
    
    switch(action.type) {
        case REGISTER_INPUT_FIELD:
            if(state[action.payload.uuid] != undefined) {
                return state;
            }

            return {
                ...state,
                [action.payload.uuid]: action.payload
            }

        case SET_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', action.value)

        case SET_FIELD_STATE:
            return {
                ...state,
                [action.fieldUuid]: action.payload
            }
        case ASSIGN_FORM:
            return updateFieldIfExists(action.fieldUuid, 'formUuid', action.formUuid)

        case CLEAR_FIELD_VALUE:
            return updateFieldIfExists(action.fieldUuid, 'value', null)

        case SET_VALIDATION_RESULTS:
            return {
                ...state,
                [action.fieldUuid]: {
                    ...state[action.fieldUuid],
                    errors: action.errors,
                    isValid: action.errors.length < 1
                }
            }
        default:
            return state
    }
}