import { REGISTER_FORM, FormState, FormActions, SEND_FORM } from "../types";
import {
    FETCH_WIZARD,
    FETCH_WIZARD_COMPLETED,
    FETCH_WIZARD_STARTED,
    FetchState,
    HIDE_FORM,
    SHOW_FORM
} from "../types/Form";

export function setCurrentForm(formData: FormState, onSubmit: (response: void) => void, onUpdate: (response: void) => void): FormActions {
    return {
        type: REGISTER_FORM,
        formData: formData,
        onSubmit: onSubmit,
        onUpdate: onUpdate
    }
}

export function sendFormAction(formUuid: string): FormActions {
    return {
        type: SEND_FORM,
        formUuid: formUuid
    }
}

export function showForm(): FormActions {
    return {
        type: SHOW_FORM
    }
}

export function hideForm(): FormActions {
    return {
        type: HIDE_FORM
    }
}

export function fetchWizardActionStarted(): FormActions {
    return {
        type: FETCH_WIZARD_STARTED
    }
}

export function fetchWizardAction(url: string, onSubmit: (response: any) => void, onUpdate: (response: any) => void): FormActions {
    return {
        type: FETCH_WIZARD,
        url: url,
        onSubmit: onSubmit,
        onUpdate: onUpdate
    }
}

export function fetchWizardActionFinished(payload: FormState, fetchState: FetchState): FormActions {
    return {
        type: FETCH_WIZARD_COMPLETED,
        payload: payload,
        fetchState: fetchState
    }
}