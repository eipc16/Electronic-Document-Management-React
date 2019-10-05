import {
    SET_FIELD_VALUE,
    SET_FIELD_STATE,
    ASSIGN_FORM,
    CLEAR_FIELD_VALUE,
    SET_VALIDATION_RESULTS,
    InputFieldTypes,
    InputFieldsState,
    REGISTER_INPUT_FIELD
} from '../types'

const initialState: InputFieldsState = {
    inputFields: []
}

export default function blockWallReducer(state = initialState, action: InputFieldTypes): InputFieldsState {
    const updateFieldIfExists = (uuid: string, property: string, newValue: any) => {
        for(let i = 0; i < state.inputFields.length; i++) {
            if(state.inputFields[i].uuid === uuid) {
                state.inputFields[i] = {
                    ...state.inputFields[i],
                    [property]: newValue
                }

                return true;
            }
        }

        return false;
    }
    
    switch(action.type) {
        case REGISTER_INPUT_FIELD:
            for(let i = 0; i < state.inputFields.length; i++) {
                if(state.inputFields[i].uuid === action.payload.uuid) {
                    return state;
                } 
            }
            
            return {
                inputFields: [
                    ...state.inputFields,
                    action.payload
                ]
            }

        case SET_FIELD_VALUE:
            updateFieldIfExists(action.fieldUuid, 'value', action.value)
            return state

        case SET_FIELD_STATE:
            for(let i = 0; i < state.inputFields.length; i++) {
                if(state.inputFields[i].uuid === action.fieldUuid) {
                    state.inputFields[i] = action.payload
                    return state;
                } 
            }
            return state

        case ASSIGN_FORM:
            updateFieldIfExists(action.fieldUuid, 'formUuid', action.formUuid)
            return state

        case CLEAR_FIELD_VALUE:
            updateFieldIfExists(action.fieldUuid, 'value', null)
            return state;

        case SET_VALIDATION_RESULTS:
            if(action.errors.length > 0) {
                updateFieldIfExists(action.fieldUuid, 'errors', action.errors);
                updateFieldIfExists(action.fieldUuid, 'isValid', false);
            } else {
                updateFieldIfExists(action.fieldUuid, 'isValid', true);
            }
            return state

        default:
            return state
    }
}