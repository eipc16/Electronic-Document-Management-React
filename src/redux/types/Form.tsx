import React from 'react'

export const REGISTER_FORM = 'REGISTER_FORM';
export const SEND_FORM = 'SEND_FORM';

export interface FormState {
    uuid: string;
    title: string;
    endpoint: string;
    visible: boolean | undefined;
    fields: string[];
}

interface RegisterFormAction {
    type: typeof REGISTER_FORM;
    formData: FormState;
}

interface SendFormAction {
    type: typeof SEND_FORM;
}

export type FormActions = 
    RegisterFormAction
    | SendFormAction