import React from 'react'
import {Button} from "react-native-paper";
import {GestureResponderEvent} from "react-native";

export interface FlowChartActionButtonsProps {
    onSaveFlowChart: (e: GestureResponderEvent) => void;
    onResetFlowChart: (e: GestureResponderEvent) => void;
    onCenterCanvas: (x: number, y: number) => void;
}

const FlowChartActionButtons = (props: FlowChartActionButtonsProps) => {

    return (
        <div className='flowchart-action-buttons'>
            <div className='flowchart-button save-flowchart'>
                <Button mode="contained" onPress={props.onSaveFlowChart}>
                    SAVE
                </Button>
            </div>
            <div className='flowchart-button reset-flowchart'>
                <Button mode="contained" onPress={props.onResetFlowChart}>
                    RESET
                </Button>
            </div>
            <div className='flowchart-button reset-coordinates'>
                <Button mode="contained" onPress={() => props.onCenterCanvas(0, 0)}>
                    CENTER
                </Button>
            </div>
        </div>
    )
};

export default FlowChartActionButtons;