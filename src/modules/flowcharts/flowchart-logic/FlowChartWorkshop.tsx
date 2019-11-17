import React from 'react';

import StatefulFlowChart from './StatefulFlowchart'
import {mapFlowChartFromDTO, mapFlowChartToDTO} from '../mapper/FlowChartMapper';
import {ReduxStore} from '../../../utils/ReduxUtils';

import '../FlowCharts.scss'
import {FlowChartDTO, FlowChartState} from "../mapper/FlowChartInterfaces";
import {connect} from "react-redux";
import {services} from "../../../context";

interface FlowChartWorkshopProps {
    flowChartId?: number;
}

interface StateProps {
    chart?: FlowChartDTO | null;
}

type WorkShopProps = FlowChartWorkshopProps & StateProps;

class FlowChartWorkshop extends React.Component<WorkShopProps, {}> {

    componentDidUpdate(prevProps: Readonly<WorkShopProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.flowChartId !== this.props.flowChartId && this.props.flowChartId) {
            services.flowChartService.fetchFlowChartById(this.props.flowChartId);
        }
    }

    onSaveFlowChart = (flowChartState: FlowChartState) => {
        const flowChartDTO = mapFlowChartToDTO(flowChartState);
        console.log(flowChartDTO);
        const fieldInjector = () => {
            return {
                nodes: mapFlowChartToDTO(flowChartState).nodes
            }
        };

        console.log(fieldInjector());

        if(this.props.flowChartId) {
            services.flowChartService.fetchUpdateFlowChartForm(this.props.flowChartId, null, null, fieldInjector);
        } else {
            services.flowChartService.fetchCreateFlowChartForm(null, null, fieldInjector);
        }
    };

    render() {
        if(!this.props.chart) {
            return null;
        }

        return (
            <div className='flow-chart-main-area'>
                <div className='flow-chart-title'><p>{this.props.chart.name}</p></div>
                <StatefulFlowChart
                    initialValue={mapFlowChartFromDTO(this.props.chart)}
                    onSaveFlowChart={this.onSaveFlowChart}
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