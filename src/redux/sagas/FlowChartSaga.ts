import {put, takeEvery} from "@redux-saga/core/effects";
import {FETCH_FLOWCHART, FetchFlowChartAction} from "../types/FlowChart";
import {fetchFlowChartBegin, fetchFlowChartComplete} from "../actions/FlowChart";
import {request, RequestType} from "../../utils/APIUtils";
import {AlertTypes, NotificationBuilder} from "../../notifications/Notification";
import {FlowChartDTO} from "../../modules/flowcharts/mapper/FlowChartInterfaces";

function* fetchFlowChartAsync(action: FetchFlowChartAction) {
    yield put(fetchFlowChartBegin());
    console.log(action.flowChartId);
    const flowChartDTO = yield request({
        url: `http://localhost:8080/flowcharts/${action.flowChartId}`,
        method: RequestType.GET
    }).then((response: FlowChartDTO) => {
        return response;
    }).catch((error: any) => {
        console.error(error);
        new NotificationBuilder().setType(AlertTypes.ERROR).build().show(error.message);
    });
    console.log(flowChartDTO);
    if(flowChartDTO) {
        yield put(fetchFlowChartComplete(flowChartDTO));
    }
}

export function* watchFlowChartActions() {
    yield takeEvery(FETCH_FLOWCHART, fetchFlowChartAsync);
}