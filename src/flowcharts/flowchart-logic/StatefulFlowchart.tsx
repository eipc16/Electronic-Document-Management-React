import React, { Dispatch } from 'react'
import { actions, FlowChart, IChart, IConfig, IFlowChartComponents } from "@mrblenny/react-flow-chart";
import { FlowChartDTO, FlowChartState, mapFlowChartToDTO } from '../mapper/FlowChartMapper';
import { FlowChartActions, UpdateFlowChartAction } from '../../redux/types/FlowChart';
import { updateFlowChart } from '../../redux/actions/FlowChart';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { GestureResponderEvent } from 'react-native';

export interface FlowChartStateProps {
  initialValue: FlowChartState;
  Components?: IFlowChartComponents;
  config?: IConfig;
}

interface DispatchProps {
  updateState: (data: FlowChartDTO) => void;
}

function mapValues<Obj extends object, Res extends { [key in keyof Obj]: any }> 
            (o: Obj, func: (value: Obj[keyof Obj]) => Res[keyof Obj]) {
  const res: Res[keyof Obj] = {} as any
  for (const key in o) {
    // eslint-disable-next-line no-prototype-builtins
    if (o.hasOwnProperty(key)) {
      res[key] = func(o[key])
    }
  }
  return res
}

type ComponentProps = FlowChartStateProps & DispatchProps

class StatefulFlowchart extends React.Component<ComponentProps, FlowChartState> {
  setChartState(state: any) { 
      this.setState(state)
  }

  private stateActions = mapValues(actions, (func: any) =>
      (...args: any) => this.setChartState(func(...args))) as typeof actions

  constructor (props: ComponentProps) {
    super(props)
    this.state = this.props.initialValue;
  }

  public render () {
    const { Components, config } = this.props
    const chart = this.state;

    if(!chart || chart === null){
      return null;
    }

    const useSaveState = (e: GestureResponderEvent) => {
      e.preventDefault()
      this.props.updateState(mapFlowChartToDTO(chart))
      console.log(chart)
      console.log(mapFlowChartToDTO(chart))
    }

    return (
      <div className='flowchart-container'>
        <div className='flowchart'>
          <FlowChart
          chart={chart}
          callbacks={this.stateActions}
          Components={Components}
          config={config}
          />
        </div>
        <div className='save-flowchart-button'>
          <Button onPress={(e) => useSaveState(e)}>
            XOXOXO
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<FlowChartActions>, ownProps: FlowChartStateProps) => {
  return {
    updateState: (data: FlowChartDTO) => dispatch(updateFlowChart(data)),
    ...ownProps
  }
}


export default connect<{}, DispatchProps, FlowChartStateProps>(
  null, mapDispatchToProps
)(StatefulFlowchart)