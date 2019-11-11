export const REGISTER_FORM = 'REGISTER_FORM';
export const SEND_FORM = 'SEND_FORM';
export const SHOW_FORM = 'SHOW_FORM';
export const HIDE_FORM = 'HIDE_FORM';

export const FETCH_WIZARD_STARTED = 'FETCH_WIZARD_STARTED';
export const FETCH_WIZARD = 'FETCH_WIZARD';
export const FETCH_WIZARD_COMPLETED = 'FETCH_WIZARD_COMPLETED';

export interface FormState {
    uuid: string;
    title: string;
    endpoint: string;
    visible: boolean | undefined;
    fields: string[];
    fetchStatus?: FetchState;
}

export enum FetchState {
    COMPLETED = "COMPLETED",
    ONGOING = "ONGOING",
    ERROR = "ERROR"
}

interface RegisterFormAction {
    type: typeof REGISTER_FORM;
    formData: FormState;
    onSubmit: (response: void) => void;
    onUpdate: (response: void) => void;
}

interface SendFormAction {
    type: typeof SEND_FORM;
    formUuid: string;
}

interface ShowFormAction {
    type: typeof SHOW_FORM;
}

interface HideFormAction {
    type: typeof HIDE_FORM;
}

interface FetchFormActionStarted {
    type: typeof FETCH_WIZARD_STARTED;
}

export interface FetchWizardAction {
    type: typeof FETCH_WIZARD;
    url: string;
    onSubmit: (response: any) => void;
    onUpdate: (response: any) => void;
}

interface FetchWizardActionCompleted {
    type: typeof FETCH_WIZARD_COMPLETED;
    fetchState: FetchState;
    payload: FormState;
}

export type FormActions = 
    RegisterFormAction
    | SendFormAction
    | ShowFormAction
    | HideFormAction
    | FetchFormActionStarted
    | FetchWizardAction
    | FetchWizardActionCompleted