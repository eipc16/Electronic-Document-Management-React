import React from 'react';

import {
    IChart,
    ILink,
    ILinkDefaultProps,
    IOnLinkCompleteInput,
    IPortDefaultProps,
    IPortWrapperProps
} from "@mrblenny/react-flow-chart/src";
import {PortDefaultOuter} from "./Port";
import {FlowChartPort, FlowChartState} from "../mapper/FlowChartInterfaces";
import { useSetPortType} from "../../utils/ReduxUtils";

const getPortColor = (portType: string) => {
    switch(portType) {
        case 'correct':
            return 'green';
        case 'incorrect':
            return 'red';
        default:
            return 'grey';
    }
}

interface PortCustomProps {
    stateActions: any;
    flowChartState: FlowChartState;
    changePort: (nodeId: string, portId: string, newResult: string) => void;
}

const isOfType = (port: FlowChartPort, type: string, result?: string) => {
    if(result) {
        return port.type === type && (port.properties.result === result);
    }
    return port.type === type;
};

const getSourcePortType = (port: FlowChartPort, state: FlowChartState) => {
    for(let [,value] of Object.entries(state.links)) {
        if(value.to.portId === port.id) {
            const sourcePortNodeId = value.from.nodeId;
            const sourcePortId = value.from.portId;
            const sourcePort = state.nodes[sourcePortNodeId].ports[sourcePortId];

            if(sourcePort) {
                return sourcePort.properties.result;
            }
        }
    }

    return 'default';
}

export const CustomPort = (props: IPortDefaultProps & PortCustomProps) => {

    const portData = props.port as FlowChartPort;
    let type = 'default';

    if(portData.type === 'input') {
        type = getSourcePortType(portData, props.flowChartState);
    } else {
        type = portData.properties.result;
    }

    const color = getPortColor(type);

    return (
        <PortDefaultOuter>
            { isOfType(portData, 'output', 'correct') && (
                <svg style={{ width: '24px', height: '24px', background: color }} viewBox="0 0 24 24">
                    <path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            )}
            { isOfType(portData, 'output', 'incorrect') && (
                <svg style={{ width: '24px', height: '24px', background: color }} viewBox="0 0 24 24">
                    <path fill="white" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            )}
            { isOfType(portData, 'input') && (
                <svg style={{ width: '24px', height: '24px', background: color }} viewBox="0 0 24 24">
                    <path fill="white" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            )}
        </PortDefaultOuter>
    )
}