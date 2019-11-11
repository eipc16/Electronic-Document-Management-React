import WizardService from "../services/WizardService";
import { Store } from "redux";
import {FlowChartService} from "../modules/flowcharts/FlowChartService";

const configureWizardService = (store: Store) => {
    return WizardService(store);
};

const configureFlowChartService = (store: Store) => {
    return FlowChartService(store);
};

const configureServices = async (store: Store) => {
    const wizardService = configureWizardService(store);
    const flowChartService = configureFlowChartService(store);

    return { wizardService, flowChartService };
};

export default configureServices;