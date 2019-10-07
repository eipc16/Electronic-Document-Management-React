import React, { useState } from 'react'
import { RadioButton, Checkbox } from 'react-native-paper'

export enum SelectorType {
    RADIO_BUTTONS,
    CHECKBOXES
}

interface SelectorProps {
    type: SelectorType;
    index: number;
    label: string;
    selected: boolean;
    onChangeState: (id: number) => void;
}

const SingleSelectorComponent = (props: SelectorProps) => {

    const [selected, setSelected] = useState(props.selected);

    switch(props.type) {
        case SelectorType.RADIO_BUTTONS:
            return (
                <div className="check-box">
                    <p>{props.label}</p>
                    <Checkbox 
                        status={selected ? 'checked' : 'unchecked'} 
                        onPress={() => setSelected(!selected)} 
                    />
                </div>
            )
        case SelectorType.CHECKBOXES:
            return (
                <RadioButton 
                    value={props.label} 
                    status={selected ? 'checked' : 'unchecked'}  
                    onPress={() => setSelected(!selected)} 
                />
            )
    }
}

const SelectorField: React.FC = () => {

    return (
        <div>
            <SingleSelectorComponent 
                type={SelectorType.CHECKBOXES} 
                index={1} 
                label='CHECKBOX_1' 
                selected={true} 
                onChangeState={(id) => alert(id)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.RADIO_BUTTONS} 
            index={1} 
            label='RADIOBUTTON_1' 
            selected={true} 
            onChangeState={(id) => alert(id)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.CHECKBOXES} 
            index={2} 
            label='CHECKBOX_2' 
            selected={false} 
            onChangeState={(id) => alert(id)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.RADIO_BUTTONS} 
            index={1} 
            label='RADIOBUTTON_2' 
            selected={false} 
            onChangeState={(id) => alert(id)} 
            />
        </div>
    
    )
}

export default SelectorField