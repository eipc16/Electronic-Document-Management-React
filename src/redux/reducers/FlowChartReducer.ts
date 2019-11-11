import {
    FlowChartActions,
    PortIdentifier,
    SET_FLOW_CHART_CALLBACKS,
    SET_PORT_TYPE,
    UPDATE_FLOW_CHART
} from '../types/FlowChart';
import {defaultFlowChart} from '../../static/flowchart';
import {FlowChartDTO, FlowChartNode} from "../../modules/flowcharts/mapper/FlowChartInterfaces";

const initialState: FlowChartDTO = defaultFlowChart;

const getNodeWithNewPortState = (node: FlowChartNode, newType: string, portId: string) => {
    const newPorts = node.ports.map(port => {
        if(port.id === portId) {
            return {
                ...port,
                properties: {
                    ...port.properties,
                    result: newType
                }
            }
        }
        return port;
    });

    return {
        ...node,
        ports: newPorts
    }
}

const getStateWithNewPortType = (state: FlowChartDTO | null, sourcePort: PortIdentifier, newType: string) => {
    if(state === null || !sourcePort.nodeId || !sourcePort.portId) {
        return state;
    }

    const destPort = sourcePort.portId ? sourcePort.portId : '';
    const destNode = sourcePort.nodeId ? sourcePort.nodeId : '';

    const newNodes = state.nodes.map(node => {
        if(node.id === destNode) {
            return getNodeWithNewPortState(node, newType, destPort);
        }
        return node;
    });

    return {
        ...state,
        nodes: newNodes
    }
};

const getStateWithCallbacks = (state: FlowChartDTO | null, callbacks: any) => {
    if(state === null) {
        return state;
    }

    return {
        ...state,
        callbacks: callbacks
    }
};

export default function flowChartReducer(
        state: FlowChartDTO | null = initialState,
        action: FlowChartActions): FlowChartDTO | null {
    switch(action.type) {
        case UPDATE_FLOW_CHART:
            return action.data;
        case SET_PORT_TYPE:
            return getStateWithNewPortType(state, action.portData, action.newType);
        case SET_FLOW_CHART_CALLBACKS:
            return getStateWithCallbacks(state, action.callbacks);
        default:
            return state
    }
}