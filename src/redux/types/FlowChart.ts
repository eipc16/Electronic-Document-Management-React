import {FlowChartDTO, FlowChartPort} from "../../flowcharts/mapper/FlowChartInterfaces";

export const UPDATE_FLOW_CHART = 'UPDATE_FLOW_CHART';
export const SET_PORT_TYPE = 'SET_PORT_TYPE';
export const SET_FLOW_CHART_CALLBACKS = 'SET_FLOW_CHART_CALLBACKS';

export const FETCH_FLOWCHART = 'FETCH_FLOWCHART';

export interface PortIdentifier {
    nodeId?: string;
    portId?: string;
}

export interface UpdateFlowChartAction {
    type: typeof UPDATE_FLOW_CHART;
    data: FlowChartDTO;
}

export interface SetPortType {
    type: typeof SET_PORT_TYPE;
    portData: PortIdentifier;
    newType: string;
}

export interface SetFlowChartCallbacksAction {
    type: typeof SET_FLOW_CHART_CALLBACKS;
    callbacks: any;
}

export type FlowChartActions = UpdateFlowChartAction | SetPortType | SetFlowChartCallbacksAction;