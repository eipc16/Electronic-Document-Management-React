import {
    UPDATE_FLOW_CHART,
    FlowChartActions,
    SET_PORT_TYPE,
    PortIdentifier,
    SET_FLOW_CHART_CALLBACKS, FETCH_FLOWCHART_BEGIN, FETCH_FLOWCHART, FETCH_FLOWCHART_END
} from '../types/FlowChart';
import {FlowChartDTO} from "../../modules/flowcharts/mapper/FlowChartInterfaces";

export function updateFlowChart(data: FlowChartDTO): FlowChartActions {
    return {
        type: UPDATE_FLOW_CHART,
        data: data
    }
}

export function setPortType(portData: PortIdentifier, newType?: string) {
    return {
        type: SET_PORT_TYPE,
        portData: portData,
        newType: newType
    }
}

export function setFlowChartCallbacks(callbacks: any): FlowChartActions {
    return {
        type: SET_FLOW_CHART_CALLBACKS,
        callbacks: callbacks
    }
}

export function fetchFlowChartBegin() {
    return {
        type: FETCH_FLOWCHART_BEGIN
    }
}

export function fetchFlowChart(flowChartId: number) {
    return {
        type: FETCH_FLOWCHART,
        flowChartId: flowChartId
    }
}

export function fetchFlowChartComplete(flowChart: FlowChartDTO) {
    return {
        type: FETCH_FLOWCHART_END,
        flowChart: flowChart
    }
}