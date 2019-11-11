import WizardService from "../services/WizardService";
import { Store } from "redux";

const configureWizardService = (store: Store) => {
    return WizardService(store);
};

const configureServices = async (store: Store) => {
    const wizardService = configureWizardService(store);

    return { wizardService };
};

export default configureServices;