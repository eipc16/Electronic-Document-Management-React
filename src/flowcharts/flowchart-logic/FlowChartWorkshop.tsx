import React, {Dispatch} from 'react';

import StatefulFlowChart, {FlowChartStateProps} from './StatefulFlowchart'
import {mapFlowChartFromDTO} from '../mapper/FlowChartMapper';
import CustomNode from '../nodes/CustomNode';
import {ReduxStore, useGetStoreState} from '../../utils/ReduxUtils';

import '../FlowCharts.scss'
import {CanvasOuterCustom} from "./FlowChartCanvas";
import {CustomPort} from "../ports/CustomPort";
import {FlowChartDTO} from "../mapper/FlowChartInterfaces";
import {CustomLink} from "../links/CustomLink";
import {connect} from "react-redux";

export const REACT_FLOW_CHART = 'react-flow-chart'

interface FlowChartWorkshopProps {
    flowChartId: string;
}

interface StateProps {
    chart?: FlowChartDTO | null;
}

type WorkShopProps = FlowChartWorkshopProps & StateProps;

class FlowChartWorkshop extends React.Component<WorkShopProps, {}> {
    constructor(props: WorkShopProps) {
        super(props);
    }

    render() {
        if(!this.props.chart) {
            return null;
        }

        return (
            <div className='flow-chart-main-area'>
                <div className='flow-chart-title'><p>{this.props.chart.name}</p></div>
                <StatefulFlowChart
                    initialValue={mapFlowChartFromDTO(this.props.chart)}
                    Components={{
                        CanvasOuter: CanvasOuterCustom,
                        Node: CustomNode,
                        Port: CustomPort
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (store: ReduxStore, ownProps: FlowChartWorkshopProps) => ({
    chart: store.flowChart,
    ...ownProps
});

export default connect(
    mapStateToProps, null
)(FlowChartWorkshop)