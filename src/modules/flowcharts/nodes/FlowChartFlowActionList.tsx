import React from 'react';

import '../FlowCharts.scss'
import Select from 'react-select';
import { getInputFieldComponent } from '../../wizards/inputs';
import { Button } from 'react-native-paper';
import { REACT_FLOW_CHART } from '@mrblenny/react-flow-chart';
import {InputStyle} from "../../wizards/inputs/FieldInterfaces";
import {useFieldStateByUUid} from "../../../utils/ReduxUtils";

const elements = [
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN"
]

export const FlowChartActionList: React.FC = (props: any) => {

    const UUID = 'flowchart-action-list-filter-textbox'
    const SEARCH_UUID = 'flowchart-action-list-department'

    const useCurrentListWithFilter = () => {
        const fieldState = useFieldStateByUUid(UUID);
        let listPositions = elements;

        if(fieldState) {
            const filter = fieldState.value !== null 
                            ? fieldState.value.toString() : '';

            listPositions = elements.filter(el => el.includes(filter))
        }

        return listPositions.map((position, id) => (
            <div className='list-position' key={`list-position-${id}`} draggable={true} onDragStart={(event) => {
                event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({
                    type: 'botton-only',
                    ports: {
                        port1: {
                          id: 'port1',
                          type: 'output',
                          properties: {
                            custom: 'property',
                            result: 'correct'
                          },
                        },
                      }
                }))
            }}><p>{position}</p></div>
        ))
    }

    return (
        <div className='flow-chart-action-list'>
            <div className='flow-chart-list-search'>
                {getInputFieldComponent({
                    label: 'Filter actions',
                    uuid: UUID,
                    name: 'flowchart-action-filter',
                    type: InputStyle.FLAT
                })}
            </div>
            <div className='flow-chart-list-search department-selector'>
                <Select placeholder="Department" name='department-selector'></Select>
            </div>
            <div className='flow-chart-action-list-elements'>
                { useCurrentListWithFilter() }
            </div>
            <div className='add-new-action'>
                <Button mode="contained" onPress={() => alert('CLICK')}>
                    DESIGN NODE
                </Button>
            </div>
        </div>
    )
}

/*

       <div className='flow-chart-menu'>
            <div className='menu-title'>
                <p className='menu-title-text'>Create Node</p>
            </div>
            <div className='menu-department-selector'>
                <Select placeholder="Department" name='department-selector'></Select>
            </div>
            <div className='menu-node-name-input'>
                {getInputFieldComponent({
                    label: 'Node name',
                    uuid: 'node-name-input-text',
                    name: 'node-name',
                    type: InputStyle.FLAT
                })}
            </div>
            <div className='menu-checkbox-selector'>
                <label className='selector-label' htmlFor='node-alternative-flow'>Node with alternative flow?</label>
                <input className='selector-checkbox' type='checkbox' name='node-alternative-flow' />
            </div>
            <div className='menu-add-btn-container'>
                <div draggable={true} onDragStart={(event) => {
                    console.log(event)
                    event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({
                        type: 'botton-only',
                        ports: {
                            port1: {
                              id: 'port1',
                              type: 'bottom',
                              properties: {
                                custom: 'property',
                              },
                            },
                          }
                    }))
                }}>ADD</div>
            </div>
        </div>

*/