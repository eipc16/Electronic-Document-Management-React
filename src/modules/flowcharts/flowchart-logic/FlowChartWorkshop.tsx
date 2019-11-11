import React from 'react';

import StatefulFlowChart from './StatefulFlowchart'
import {mapFlowChartFromDTO} from '../mapper/FlowChartMapper';
import {ReduxStore} from '../../../utils/ReduxUtils';

import '../FlowCharts.scss'
import {FlowChartDTO} from "../mapper/FlowChartInterfaces";
import {connect} from "react-redux";

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