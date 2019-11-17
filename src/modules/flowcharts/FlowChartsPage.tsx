import React from 'react'


import './FlowCharts.scss'
import FlowChartList from './flowchart-list/FlowChartList'
import FlowChartWorkshop from './flowchart-logic/FlowChartWorkshop'
import { withRouter } from 'react-router-dom';

const FlowChartPage: React.FC = (props: any) => {
    return (
        <div className='flow-chart-page'>
            <FlowChartList />
            <FlowChartWorkshop flowChartId={props.match.params.flowchartId} />
        </div>
    )
};

export default withRouter(FlowChartPage);