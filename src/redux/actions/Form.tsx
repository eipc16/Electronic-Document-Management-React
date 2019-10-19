import { REGISTER_FORM, FormState, FormActions } from "../types";

export function setCurrentForm(formData: FormState): FormActions {
    return {
        type: REGISTER_FORM,
        formData: formData
    }
}