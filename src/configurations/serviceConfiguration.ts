import WizardService from "../services/WizardService";
import { Store } from "redux";
import {FlowChartService} from "../services/FlowChartService";
import {DocumentService} from "../services/DocumentService";

const configureWizardService = (store: Store) => {
    return WizardService(store);
};

const configureFlowChartService = (store: Store) => {
    return FlowChartService(store);
};

const configureDocumentService = (store: Store) => {
    return DocumentService(store);
};

const configureServices = async (store: Store) => {
    const wizardService = configureWizardService(store);
    const flowChartService = configureFlowChartService(store);
    const documentService = configureDocumentService(store);

    return { wizardService, flowChartService, documentService };
};

export default configureServices;