import React from 'react'

export const REGISTER_FORM = 'REGISTER_FORM';

export interface FormState {
    uuid: string;
    title: string;
    endpoint: string;
    visible: boolean;
    fields: string[];
}

interface RegisterFormAction {
    type: typeof REGISTER_FORM;
    formData: FormState;
}

export type FormActions = RegisterFormAction