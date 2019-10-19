import React from 'react'
import { FormState, FormActions, InputFieldsState, InputFieldState } from '../types'

const initialState: FormState = {
    uuid: '',
    title: '',
    endpoint: '',
    visible: false,
    fields: []
}

const sendForm = (state: FormState, inputFields: InputFieldsState) => {
    let payload = {
        form: state.uuid
    }

    Object.keys(inputFields).forEach(entry => {
        const field = inputFields[entry]
        
        if(field.formUuid === state.uuid) {
            payload = {
                ...payload,
                [field.name]: field.value
            }
        }
    })

    // console.log('Sending form to endpoint: ' + state.endpoint)
    // console.log('BODY: ')
    // console.log(payload)
}

export default function formReducer(state = initialState, action: FormActions, inputFields: InputFieldsState) {
    switch(action.type) {
        case 'REGISTER_FORM':
            return {
                ...state,
                uuid: action.formData.uuid,
                title: action.formData.title,
                endpoint: action.formData.endpoint,
                visible: action.formData.visible? action.formData.visible : false,
                fields: action.formData.fields
            }
        case 'SEND_FORM':
            sendForm(state, inputFields)
            return state
    }

    return state
}