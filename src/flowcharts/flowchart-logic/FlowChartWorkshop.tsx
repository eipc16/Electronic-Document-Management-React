import React from 'react';
import { ICanvasOuterDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components';

import StatefulFlowChart from './StatefulFlowchart'
import { mapFlowChartFromDTO, FlowChartDTO } from '../mapper/FlowChartMapper';
import CustomNode from '../nodes/CustomNode';
import { useGetStoreState } from '../../utils/ReduxUtils';

import '../FlowCharts.scss'

export const REACT_FLOW_CHART = 'react-flow-chart'

const CanvasOuterCustom = styled.div<ICanvasOuterDefaultProps>`
  position: relative;
  background-size: 10px 10px;
  background-color: lightgrey;
  background-image:
    linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0),
    linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0);
  max-width: 100vw;
  height: 100vh;
  overflow: hidden;
` as any

export const FlowChartWorkshop: React.FC<{flowChartId: string}> = (props: {flowChartId: string}) => {
    const chart: FlowChartDTO | null = useGetStoreState('flowChart') as FlowChartDTO

    console.log(props)

    if(chart === null) {
      return null
    }

    return (
        <div className='flow-chart-workshop'>
            <div className='flow-chart-title'><p>{chart.name}</p></div>
            <div className='flow-chart-main-area'>
              <StatefulFlowChart
              initialValue={mapFlowChartFromDTO(chart)}
              Components={{
                  CanvasOuter: CanvasOuterCustom,
                  Node: CustomNode
              }}
              />
            </div>
        </div>
    )
}