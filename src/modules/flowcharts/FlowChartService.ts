import {Store} from "redux";
import {request, RequestType} from "../../utils/APIUtils";
import {AlertTypes, NotificationBuilder} from "../../notifications/Notification";

export const FlowChartService = (store: Store) => {

    const fetchDataBySearchText = (url: string, searchText: string) => {
        const targetUrl = `http://localhost:8080${url}?searchText=${searchText}`;
        return request({url: targetUrl, method: RequestType.GET})
            .then((response) => { return response;})
            .catch(error => {
                console.error(error);
                new NotificationBuilder().setType(AlertTypes.ERROR).build().show(error.message);
            });
    };

    const fetchFlowChartListStateless = (searchText: string) =>
        new Promise(resolve => {
            resolve(fetchDataBySearchText('/flowcharts/list', searchText));
        });

    return Object.freeze({ fetchFlowChartListStateless });
};