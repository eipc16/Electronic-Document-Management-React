import React, {useEffect, useState} from 'react';
import {generateCurvePath, ILinkDefaultProps} from "@mrblenny/react-flow-chart/src";
import {FlowChartLink, FlowChartPort, FlowChartState} from "../mapper/FlowChartInterfaces";
import {useNodeById, usePortByIdAndNodeId, useSetPortType} from "../../utils/ReduxUtils";
import {customCurvePath} from "./CustomCurveGenerator";

const getColorFromPort = (port?: FlowChartPort) => {
    if(port) {
        switch(port.properties.result) {
            case 'correct':
                return 'green';
            case 'incorrect':
                return 'red';
        }
    }

    return 'cornflowerblue';
};

const getPort = (flowChartState: FlowChartState, nodeId: string, portId: string) => {
    const node = flowChartState.nodes[nodeId];

    if(node) {
        return node.ports[portId];
    }
};

const nodeHasLink = (flowChartState: FlowChartState, nodeId: string, portId: string) => {
    let counter = 0;
    for(const [,value] of Object.entries(flowChartState.links)) {
        if(value.from.nodeId === nodeId && value.from.portId === portId) {
            counter++;
        }
        if(counter > 1) {
            return true;
        }
    }
    return false;
}

interface LinkCustomProps {
    stateActions: any;
    flowChartState: FlowChartState;
    scale: number;
    changePort: (nodeId: string, portId: string, newResult: string) => void;
}

export const CustomLink = (props: ILinkDefaultProps & LinkCustomProps) => {

    const { startPos, endPos, config, link,
            onLinkClick, onLinkMouseEnter, onLinkMouseLeave,
            isSelected, isHovered } = props;

    const linkData = props.link as FlowChartLink;

    const portFrom = getPort(props.flowChartState, linkData.from.nodeId, linkData.from.portId);
    const portTo = getPort(props.flowChartState, linkData.to.nodeId, linkData.to.portId);

    if(nodeHasLink(props.flowChartState, linkData.from.nodeId, linkData.from.portId) && !portTo) {
        return null;
    }

    if(portFrom && portFrom.type !== 'output' || (portTo && portTo.type !== 'input')) {
        return null;
    }

    // if(portTo && portFrom && portTo.properties.result !== portFrom.properties.result) {
    //     props.changePort(linkData.to.nodeId, linkData.to.portId, portFrom.properties.result);
    // }

    const color = getColorFromPort(portFrom);
    let points;

    if(portFrom) {
        points = customCurvePath({
            x: startPos.x * props.scale,
            y: startPos.y * props.scale
        }, {
            x: endPos.x * props.scale,
            y: endPos.y * props.scale
        }, portFrom.properties.result);
    }

    const onClickEvent = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        e.preventDefault();
        onLinkClick({ linkId: link.id });
        e.stopPropagation();
    };

    const onDragEvent = (e: React.DragEvent) => {
        e.preventDefault();
        console.log(e);
        e.stopPropagation();
    };

    return (
        <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
            <circle
                r="4"
                cx={startPos.x}
                cy={startPos.y}
                fill={color}
            />
            {/* Main line */}
            <path
                d={points}
                stroke={color}
                strokeWidth="3"
                fill="none"
                onDragStart={onDragEvent}
            />
            {/* Thick line to make selection easier */}
            <path
                d={points}
                stroke={color}
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
                onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
                onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
                onClick={onClickEvent}
            />
            <circle
                r="4"
                cx={endPos.x}
                cy={endPos.y}
                fill={color}
            />
        </svg>
    )
};