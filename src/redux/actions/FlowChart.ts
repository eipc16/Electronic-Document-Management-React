import { UPDATE_FLOW_CHART, FlowChartActions } from './../types/FlowChart';
import { FlowChartDTO } from '../../flowcharts/mapper/FlowChartMapper';

export function updateFlowChart(data: FlowChartDTO): FlowChartActions {
    return {
        type: UPDATE_FLOW_CHART,
        data: data
    }
}