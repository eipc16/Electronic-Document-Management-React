import React from "react";

import {useSelector} from "react-redux";
import {ReduxStore} from "../../../utils/ReduxUtils";
import StatefulFlowChart from "../../../flowcharts/flowchart-logic/StatefulFlowchart";
import {mapFlowChartFromDTO} from "../../../flowcharts/mapper/FlowChartMapper";

import '../styles/DocumentFlowChart.scss';
import {DocumentProps} from "./DocumentInfo";

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