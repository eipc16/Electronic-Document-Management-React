import React from 'react'
import { INodeDefaultProps } from '@mrblenny/react-flow-chart'
import {StartNode} from "./StartNode";
import {EndNode} from "./EndNode";

import './Nodes.scss'
import {DepartmentNode} from "./DepartmentNode";
import {FlowChartNodeState} from "../mapper/FlowChartInterfaces";

function CustomNode({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) {
    const getNodeWithTitle = (title: string, department: any | null, id?: string) => {
        const node = (
            <div className='node-data' key={id ? id : `${title}_${department}`}>
                <div className='node-title'>{title}</div>
                { department ? (
                    <div className='node-department'>{department !== null && department.name !== null ? department.name : null}</div>
                ): null}
            </div>
        );

        const nodePreviousChildren = children.props.children.filter((child: any) => !child.props.node);

        return {
            ...children,
            props: {
                ...children.props,
                children: [
                    ...nodePreviousChildren,
                    node
                ]
            }
        }
    };


    const nodeData = node as FlowChartNodeState;
    const nodeProps = getNodeWithTitle(nodeData.message, nodeData.department, nodeData.id);

    switch(node.type) {
        case "start-node":
            return <StartNode ref={ref} key={nodeData.id} {...otherProps}>{nodeProps}</StartNode>;
        case "end-node":
            return <EndNode ref={ref} key={nodeData.id} {...otherProps}>{nodeProps}</EndNode>;
        default:
            return <DepartmentNode ref={ref} key={nodeData.id} color={'cornflowerblue'} {...otherProps}>{nodeProps}</DepartmentNode>;
    }
}

export default React.forwardRef(CustomNode)

