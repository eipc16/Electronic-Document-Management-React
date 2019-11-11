import { REGISTER_FORM, FormState, FormActions, SEND_FORM } from "../types";
import {HIDE_FORM, SHOW_FORM} from "../types/Form";

export function setCurrentForm(formData: FormState): FormActions {
    return {
        type: REGISTER_FORM,
        formData: formData
    }
}

export function sendForm(): FormActions {
    return {
        type: SEND_FORM
    }
}

export function showForm(formUuid: string): FormActions {
    return {
        type: SHOW_FORM,
        formUuid: formUuid
    }
}

export function hideForm(formUuid: string): FormActions {
    return {
        type: HIDE_FORM,
        formUuid: formUuid
    }
}