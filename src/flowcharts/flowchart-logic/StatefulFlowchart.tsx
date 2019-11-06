import React, { Dispatch } from 'react'
import { actions, FlowChart, IChart, IConfig, IFlowChartComponents } from "@mrblenny/react-flow-chart";
import { mapFlowChartFromDTO, mapFlowChartToDTO} from '../mapper/FlowChartMapper';
import { FlowChartActions } from '../../redux/types/FlowChart';
import {updateFlowChart} from '../../redux/actions/FlowChart';
import { connect } from 'react-redux';
import {GestureResponderEvent} from 'react-native';
import Alert from 'react-s-alert';
import FlowChartActionButtons from "./FlowChartActionButtons";
import {ReduxStore} from "../../utils/ReduxUtils";
import {FlowChartDTO, FlowChartState} from "../mapper/FlowChartInterfaces";
import mapValues from "@mrblenny/react-flow-chart/src/container/utils/mapValues";
import {CustomLink} from "../links/CustomLink";
import {CustomPort} from "../ports/CustomPort";
import {CanvasOuterCustom} from "./FlowChartCanvas";
import CustomNode from "../nodes/CustomNode";
import {IOnLinkCompleteInput} from "@mrblenny/react-flow-chart/src";

export interface FlowChartStateProps {
  initialValue: FlowChartState;
  config?: IConfig;
  readOnly?: boolean;
}

interface DispatchProps {
  updateState: (data: FlowChartDTO) => void;
}

interface StateProps {
  defaultState: FlowChartState;
  defaultClearState: FlowChartDTO | null;
}

type ComponentProps = FlowChartStateProps & DispatchProps & StateProps;

class StatefulFlowchart extends React.Component<ComponentProps, FlowChartState> {
    private stateActions = mapValues(actions, (func: any) =>
        (...args: any) => this.setState(func(...args))) as typeof actions;

    constructor(props: ComponentProps) {
      super(props);
      this.state = this.props.defaultState;
    }

    saveFlowChartState = (state: FlowChartState, callback: () => void) => {
      this.props.updateState(mapFlowChartToDTO(state));
      callback();
    };

    addNode = (node: any) => {
      this.setState({
          ...this.state,
        nodes: {
            ...this.state.nodes,
          [node.id]: node
        }
      });
    };

    useSaveState = (e: GestureResponderEvent) => {
      e.preventDefault();
      this.saveFlowChartState(this.state, () => {
        Alert.info(`Saved state for flowchart ${this.state.name}!`);
      });
    };

    useClearState = (e: GestureResponderEvent) => {
      e.preventDefault();
      this.setState(
          mapFlowChartFromDTO(this.props.defaultClearState),
          () => {
            Alert.info("Flowchart has been reset to the last saved state!");
          });
    };

    doubleClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();

      if(this.props.config && this.props.config.readonly) {
          return;
      }

      const x = Math.random();

      // get form from sever, push results to state
      this.addNode({
        id: `${x}`,
            type: "input-output",
            message: "HELLO_3",
            department: "elo2",
          size: {
              width: 250,
              height: 80,
          },
            position: {
            x: 200, y: 200
        },
        ports: {
          [`${x}-port1`]: {
                id: `${x}-port1`,
              type: "input"
          },
          [`${x}-port2`]: {
            id: `${x}-port2`,
                type: "output",
                properties: {
                  result: 'correct'
            }
          }
        }
      },)
    };

    setPortResult = (nodeId: string, portId: string, newType: string) => {
        // this.setState({
        //     ...this.state,
        //     nodes: {
        //         ...this.state.nodes,
        //         [nodeId]: {
        //             ...this.state.nodes[nodeId],
        //             ports: {
        //                 ...this.state.nodes[nodeId].ports,
        //                 [portId]: {
        //                     ...this.state.nodes[nodeId].ports[portId],
        //                     properties: {
        //                         result: newType
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
    };

    setCanvasPosition = (x: number, y: number) => {
        this.setState({
            ...this.state,
            offset: {
                ...this.state.offset,
                x: x,
                y: y
            }
        })
    };

    getDefaultConfig = () => {
        return {
            validateLink: ({fromNodeId, fromPortId, toNodeId, toPortId, chart}: IOnLinkCompleteInput & {chart: IChart}): boolean => {
                let sourceLinks = 0;
                let targetLinks = 0;
                for (const [,value] of Object.entries(chart.links)) {
                    if(value.from.nodeId === fromNodeId && value.from.portId === fromPortId) {
                        sourceLinks++;
                    }

                    if(value.to.nodeId === toNodeId && value.to.portId === toPortId) {
                        targetLinks++;
                    }

                    if(targetLinks > 0 || sourceLinks > 1) {
                        return false;
                    }
                }

                return true;
            }
        }
    }

    public render () {
      let config: IConfig;
      const chart = this.state;

      if(!chart){
        return null;
      }

      if(!this.props.config) {
          config = this.getDefaultConfig();
      } else {
          config = this.props.config;
      }

      const scale = 1;

      return (
        <div className='flowchart-container'>
          <div className='flowchart' onDoubleClick={this.doubleClickHandler}>
            <FlowChart
            chart={chart}
            callbacks={this.stateActions}
            Components={{
                CanvasOuter: CanvasOuterCustom,
                Node: CustomNode,
                Port: (props) => {
                    return <CustomPort {...props} stateActions={this.stateActions} flowChartState={chart} changePort={this.setPortResult}/>
                },
                Link: (props) => {
                    return <CustomLink {...props} stateActions={this.stateActions} flowChartState={chart} scale={scale} changePort={this.setPortResult}/>
                }
            }}
            config={{
                ...config,
                readonly: false
            }}
            />
          </div>
          <FlowChartActionButtons
            onSaveFlowChart={this.useSaveState}
            onResetFlowChart={this.useClearState}
            onCenterCanvas={this.setCanvasPosition}
            readOnly={this.props.readOnly ? this.props.readOnly : false}
          />
          {/*<FlowChartCanvasData />*/}
        </div>
      )
    }
}

const mapStateToProps = (store: ReduxStore, ownProps: FlowChartStateProps) => ({
  defaultState: mapFlowChartFromDTO(store.flowChart),
  defaultClearState: store.flowChart,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch<FlowChartActions>, ownProps: FlowChartStateProps) => ({
    updateState: (data: FlowChartDTO) => dispatch(updateFlowChart(data)),
    ...ownProps
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StatefulFlowchart)