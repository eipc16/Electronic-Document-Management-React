import {FETCH_WIZARD, REGISTER_FORM} from "../redux/types/Form";

interface ReferenceStore {
    onWizardUpdate?: (response: any) => void;
    onWizardSubmit?: (response: any) => void;
    wizardInjector?: () => any;
}

export const refStore: ReferenceStore = {};

export const refHandlerMiddleware = () => {
    return (next: any) => (action: any) => {
        switch(action.type) {
            case REGISTER_FORM:
                refStore.onWizardUpdate = action.onUpdate;
                refStore.onWizardSubmit = action.onSubmit;
                refStore.wizardInjector = action.fieldInjector;
                break;
            case FETCH_WIZARD:
                refStore.onWizardUpdate = action.onUpdate;
                refStore.onWizardSubmit = action.onSubmit;
                refStore.wizardInjector = action.fieldInjector;
                break;
        }
        return next(action);
    }
};