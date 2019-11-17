import {Store} from "redux";
import {services} from "../context";
import history from "../utils/history";
import {fetchFlowChart, fetchFlowChartComplete} from "../redux/actions/FlowChart";
import {defaultFlowChart} from "../static/flowchart";

export const FlowChartService = (store: Store) => {

    const fetchDataBySearchText = (url: string, searchText: string) => {
        return services.wizardService.fetchSearchBoxOptionsStateless(url, searchText);
    };

    const fetchFlowChartListStateless = (searchText: string) =>
        new Promise(resolve => {
            resolve(fetchDataBySearchText('flowcharts/list', searchText));
        });

    const mainFlowChartPage = (history: any) => {
        history.push('/flowcharts/');
        store.dispatch(fetchFlowChartComplete(defaultFlowChart))
    };

    const changePage = (history: any, flowChardId?: number) => {
        history.push(`/flowcharts/${flowChardId}`);
    };

    const fetchFlowChartById = (flowChartId: number) => {
        console.log(flowChartId)
        if(flowChartId) {
            store.dispatch(fetchFlowChart(flowChartId));
        }
    };

    const fetchUpdateFlowChartForm = (flowChartId: number, onSubmit?: (node: any) => void,
                                      onUpdate?: (updatedForm: any) => void, fieldInjector?: () => any) => {
        return services.wizardService.fetchWizardFromServer(
            `http://localhost:8080/wizards/update-flowchart?id=${flowChartId}`,
            onSubmit, onUpdate, fieldInjector
        );
    };

    const fetchCreateFlowChartForm = (onSubmit?: (node: any) => void, onUpdate?: (updatedForm: any) => void,
                                      fieldInjector?: () => any) => {
        return services.wizardService.fetchWizardFromServer(
            'http://localhost:8080/wizards/create-flowchart',
            onSubmit, onUpdate, fieldInjector
        );
    };

    const fetchCreateNodeForm = (onSubmit?: (node: any) => void, onUpdate?: (updatedForm: any) => void) => {
        services.wizardService.fetchWizardFromServer('http://localhost:8080/wizards/node-form', onSubmit, onUpdate);
    };

    return Object.freeze({ fetchFlowChartListStateless, changePage, fetchFlowChartById,
        mainFlowChartPage, fetchCreateNodeForm, fetchUpdateFlowChartForm, fetchCreateFlowChartForm });
};