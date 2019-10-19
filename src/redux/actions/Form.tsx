import { REGISTER_FORM, FormState, FormActions, SEND_FORM } from "../types";

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