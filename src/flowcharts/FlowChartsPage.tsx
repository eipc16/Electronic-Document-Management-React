import React from 'react'


import './FlowCharts.scss'
import { FlowChartList } from './FlowChartList'
import { FlowChartWorkshop } from './FlowChartWorkshop'
import { FlowChartMenu } from './FlowChartMenu'

export const FlowChartPage: React.FC = (props: any) => {
    return (
        <div className='flow-chart-page'>
            <FlowChartMenu />
            <FlowChartList />
            <FlowChartWorkshop />
        </div>
    )
}