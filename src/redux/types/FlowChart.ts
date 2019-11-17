import {FlowChartDTO} from "../../modules/flowcharts/mapper/FlowChartInterfaces";

export const UPDATE_FLOW_CHART = 'UPDATE_FLOW_CHART';
export const SET_PORT_TYPE = 'SET_PORT_TYPE';
export const SET_FLOW_CHART_CALLBACKS = 'SET_FLOW_CHART_CALLBACKS';

export const FETCH_FLOWCHART = 'FETCH_FLOWCHART';
export const FETCH_FLOWCHART_BEGIN = 'FETCH_FLOWCHART_BEGIN';
export const FETCH_FLOWCHART_END = 'FETCH_FLOWCHART_END';

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

export interface FetchFlowChartStartAction {
    type: typeof FETCH_FLOWCHART_BEGIN;
}

export interface FetchFlowChartAction {
    type: typeof FETCH_FLOWCHART;
    flowChartId: number;
}

export interface FetchFlowChartCompletedAction {
    type: typeof FETCH_FLOWCHART_END;
    flowChart: FlowChartDTO;
}

export type FlowChartActions = UpdateFlowChartAction | SetPortType | SetFlowChartCallbacksAction | FetchFlowChartAction | FetchFlowChartCompletedAction | FetchFlowChartStartAction;