import React from 'react';

import '../FlowCharts.scss'
import { useFieldStateByUUid } from '../../utils/ReduxUtils';
import { getInputFieldComponent, InputStyle } from '../../wizards/inputs';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from 'react-native-paper';

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

export const FlowChartList: React.FC = (props: any) => {

    const UUID = 'flowchart-list-filter-textbox'

    const useCurrentListWithFilter = () => {
        const fieldState = useFieldStateByUUid(UUID)
        let listPositions = elements;

        if(fieldState) {
            const filter = fieldState.value !== null 
                            ? fieldState.value.toString() : '';

            listPositions = elements.filter(el => el.includes(filter))
        }

        return listPositions.map((position, id) => (
            <div className='list-position' key={`list-position-${id}`}>
                <p>{position}</p>
            </div>
        ))
    }

    return (
        <div className='flow-chart-list'>
            <div className='flow-chart-list-search'>
                {getInputFieldComponent({
                    label: 'Filter flowcharts',
                    uuid: UUID,
                    name: 'flowchart-filter',
                    type: InputStyle.FLAT
                })}
            </div>
            <div className='flow-chart-list-elements'>
                { useCurrentListWithFilter() }
            </div>
            <div className='add-new-flowchart'>
                <Button mode="contained" onPress={() => alert('CLICK')}>
                    NEW FLOWCHART
                </Button>
            </div>
        </div>
    )
}