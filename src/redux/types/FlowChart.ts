import { FlowChartDTO } from "../../flowcharts/mapper/FlowChartMapper";

export const UPDATE_FLOW_CHART = 'UPDATE_FLOW_CHART';

export interface UpdateFlowChartAction {
    type: typeof UPDATE_FLOW_CHART;
    data: FlowChartDTO;
}

export type FlowChartActions = UpdateFlowChartAction