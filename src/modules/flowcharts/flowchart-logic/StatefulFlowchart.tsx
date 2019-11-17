import React, { Dispatch } from 'react'
import { actions, FlowChart, IChart, IConfig} from "@mrblenny/react-flow-chart";
import {mapFlowChartFromDTO, mapFlowChartToDTO} from '../mapper/FlowChartMapper';
import { FlowChartActions } from '../../../redux/types/FlowChart';
import {updateFlowChart} from '../../../redux/actions/FlowChart';
import { connect } from 'react-redux';
import {GestureResponderEvent} from 'react-native';
import Alert from 'react-s-alert';
import FlowChartActionButtons from "./FlowChartActionButtons";
import {FlowChartDTO, FlowChartState} from "../mapper/FlowChartInterfaces";
import mapValues from "@mrblenny/react-flow-chart/src/container/utils/mapValues";
import {CustomLink} from "../links/CustomLink";
import {CustomPort} from "../ports/CustomPort";
import {CanvasOuterCustom} from "./FlowChartCanvas";
import CustomNode from "../nodes/CustomNode";
import {IOnLinkCompleteInput} from "@mrblenny/react-flow-chart/src";
import {services} from "../../../context";
import {ReduxStore} from "../../../utils/ReduxUtils";

export interface FlowChartStateProps {
  initialValue: FlowChartState;
  config?: IConfig;
  readOnly?: boolean;
}

interface ReduxProps {
    defaultState: FlowChartState;
    onSaveFlowChart?: (state: FlowChartState) => void;
}

interface DispatchProps {
  updateState: (data: FlowChartDTO) => void;
}

type ComponentProps = FlowChartStateProps & DispatchProps & ReduxProps;

class StatefulFlowchart extends React.Component<ComponentProps, FlowChartState> {
    private stateActions: any;

    constructor(props: ComponentProps) {
      super(props);

      this.state = this.props.initialValue;
      this.stateActions = mapValues(actions, (func: any) =>
          (...args: any) => this.setState(func(...args))) as typeof actions;
    }

    componentDidUpdate(prevProps: Readonly<ComponentProps>, prevState: Readonly<FlowChartState>, snapshot?: any): void {
        if(prevProps.initialValue !== this.props.initialValue) {
            this.setState(this.props.initialValue);
        }
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
      if(this.props.onSaveFlowChart) {
          this.props.onSaveFlowChart(this.state);
      }
      // this.saveFlowChartState(this.state, () => {
      //   Alert.info(`Saved state for flowchart ${this.state.name}!`);
      // });
    };

    useClearState = (e: GestureResponderEvent) => {
      e.preventDefault();
      this.setState(
          this.props.defaultState,
          () => {
            Alert.info("Flowchart has been reset to the last saved state!");
          });
    };

    doubleClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if(this.props.config && this.props.config.readonly) {
            return;
        }

        console.log('??');
        const formUuid = services.flowChartService.fetchCreateNodeForm(
            (node: any) => this.addNode(node),
            (updatedForm: any) => console.log(updatedForm)
        );

        console.log(`Fetched form: ${formUuid}`)
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

      if(!this.props.initialValue){
        return <div/>
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
                chart={this.state}
                callbacks={this.stateActions}
                Components={{
                    CanvasOuter: CanvasOuterCustom,
                    Node: CustomNode,
                    Port: (props) => {
                        return <CustomPort {...props} flowChartState={this.state} />
                    },
                    Link: (props) => {
                        return <CustomLink {...props} flowChartState={this.state} scale={scale} />
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
        </div>
      )
    }
}

const mapStateToProps = (store: ReduxStore, ownProps: FlowChartStateProps) => {
    return {
        defaultState: mapFlowChartFromDTO(store.flowChart),
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch: Dispatch<FlowChartActions>, ownProps: FlowChartStateProps) => ({
    updateState: (data: FlowChartDTO) => dispatch(updateFlowChart(data)),
    ...ownProps
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StatefulFlowchart)