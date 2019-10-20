import React from 'react';
import { FlowChartWithState, ICanvasOuterDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components';
import './FlowCharts.scss'

const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
    nodes: {
      node1: {
        id: "node1",
        type: "output-only",
        position: {
          x: 300,
          y: 100
        },
        ports: {
          port1: {
            id: "port1",
            type: "output",
            properties: {
              value: "yes"
            }
          },
          port2: {
            id: "port2",
            type: "output",
            properties: {
              value: "no"
            }
          }
        }
      },
      node2: {
        id: "node2",
        type: "input-output",
        position: {
          x: 300,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
    },
    links: {
      link1: {
        id: "link1",
        from: {
          nodeId: "node1",
          portId: "port2"
        },
        to: {
          nodeId: "node2",
          portId: "port1"
        },
      },
    },
    selected: {},
    hovered: {}
  };

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

export const FlowChartWorkshop: React.FC = (props: any) => {
    return (
        <div className='flow-chart-workshop'>
            <FlowChartWithState initialValue={chartSimple}Components={ {
                CanvasOuter: CanvasOuterCustom,
              }} />
        </div>
    )
}