import React from 'react'
import { FormState, FormActions, InputFieldsState, InputFieldState } from '../types'

const initialState: FormState = {
    uuid: '',
    title: '',
    endpoint: '',
    visible: false,
    fields: []
}

/* ACCESSING OTHER FIELDS FROM FORM :)
    const fields: InputFieldState[] = []
    
    if(inputFields) {
        console.log(inputFields)
        Object.keys(inputFields).forEach(entry => {
            const field = inputFields[entry]
            console.log(field.formUuid + ' <--> ' + state.uuid)
            if(field.formUuid === state.uuid) {
                fields.push(field)
            }
        })
    }
*/

export default function formReducer(state = initialState, action: FormActions, inputFields: InputFieldsState) {
    
    return {...state}
}