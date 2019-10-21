import React from 'react'


import './FlowCharts.scss'
import { FlowChartList } from './flowchart-list/FlowChartList'
import { FlowChartWorkshop } from './flowchart-logic/FlowChartWorkshop'
import { FlowChartActionList } from './nodes/FlowChartFlowActionList'

export const FlowChartPage: React.FC = (props: any) => {
    return (
        <div className='flow-chart-page'>
            <FlowChartActionList />
            <FlowChartList />
            <FlowChartWorkshop flowChartId={props.match.params.flowchartId} />
        </div>
    )
}