import { FlowChartActions, UPDATE_FLOW_CHART } from './../types/FlowChart';
import { FlowChartDTO, FlowChartState, mapFlowChartToDTO } from '../../flowcharts/mapper/FlowChartMapper';

const initialState: FlowChartState = {
        offset: {
          x: 0,
          y: 0
        },
        nodes: {
          node1: {
            id: "node1",
            type: "output-only",
            message: "HELO",
            department: "elo",
            position: {
              x: 100,
              y: 100
            },
            ports: {
              port1: {
                id: "port1",
                type: "output",
                properties: {
                  value: "yes",
                  result: "correct"
                }
              },
              port2: {
                id: "port2",
                type: "output",
                properties: {
                  value: "no",
                  result: "incorrect"
                }
              }
            }
          },
          node2: {
            id: "node2",
            type: "input-output",
            message: "HELLO_2",
            department: "elo2",
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
                type: "output",
                properties: {
                  value: "yes",
                  result: "correct"
                }
              }
            }
          },
        },
        links: {
          link1: {
            id: "link1",
            from: {
              nodeId: "node1",
              portId: "port1"
            },
            to: {
              nodeId: "node2",
              portId: "port1"
            },
          },
        },
        selected: {},
        hovered: {},
        name: 'flow-1'
      }

export default function flowChartReducer(
        state: FlowChartDTO | null = mapFlowChartToDTO(initialState), 
        action: FlowChartActions): FlowChartDTO | null {
    switch(action.type) {
        case UPDATE_FLOW_CHART:
            return action.data
        default:
            return state
    }
}