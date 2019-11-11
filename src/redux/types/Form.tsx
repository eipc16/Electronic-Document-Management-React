import React from 'react'

export const REGISTER_FORM = 'REGISTER_FORM';
export const SEND_FORM = 'SEND_FORM';
export const SHOW_FORM = 'SHOW_FORM';
export const HIDE_FORM = 'HIDE_FORM';

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

interface ShowFormAction {
    type: typeof SHOW_FORM;
    formUuid: string;
}

interface HideFormAction {
    type: typeof HIDE_FORM;
    formUuid: string;
}

export type FormActions = 
    RegisterFormAction
    | SendFormAction
    | ShowFormAction
    | HideFormAction;