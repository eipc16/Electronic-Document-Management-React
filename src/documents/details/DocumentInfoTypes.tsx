import React from "react";
import StatefulFlowChart from "../../flowcharts/flowchart-logic/StatefulFlowchart";
import {mapFlowChartFromDTO} from "../../flowcharts/mapper/FlowChartMapper";
import {useSelector} from "react-redux";
import {ReduxStore} from "../../utils/ReduxUtils";

import '../Documents.scss'

interface DocumentProps {
    selectedItemId: string;
}

export const DocumentDetails = (props: DocumentProps) => {
    return (
        <div className='document-info'>Details: {props.selectedItemId}</div>
    )
};

export const DocumentFlowChart = (props: DocumentProps) => {

    const chart = useSelector((store: ReduxStore) => store.flowChart);

    return (
        <div className='document-info flow-chart'>
            <StatefulFlowChart
                initialValue={mapFlowChartFromDTO(chart)}
                readOnly={true}
                config={{
                    validateLink: () => false
                }}
            />
        </div>
    )
};

export const DocumentComments = (props: DocumentProps) => {
    return (
        <div className='document-info'>Comments: {props.selectedItemId}</div>
    )
};

export const DocumentHistory = (props: DocumentProps) => {
    return (
        <div className='document-info'>History: {props.selectedItemId}</div>
    )
};