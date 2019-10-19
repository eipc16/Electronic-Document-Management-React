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

    switch(props.type) {
        case SelectorType.RADIO_BUTTONS:
            return (
                <div className="check-box">
                    <p>{props.label}</p>
                    <Checkbox 
                        status={props.selected ? 'checked' : 'unchecked'} 
                        onPress={() => props.onChangeState(props.index)} 
                    />
                </div>
            )
        case SelectorType.CHECKBOXES:
            return (
                <RadioButton 
                    value={props.label} 
                    status={props.selected ? 'checked' : 'unchecked'}  
                    onPress={() => props.onChangeState(props.index)} 
                />
            )
    }
}

const SelectorField: React.FC = () => {

    const [selectedRadioBtn, setSelectedRadioBtns] = useState(1);
    const [selectedCheckbox1, setSelectedCheckBox1] = useState(false);
    const [selectedCheckbox2, setSelectedCheckBox2] = useState(true);

    return (
        <div>
            <SingleSelectorComponent 
                type={SelectorType.CHECKBOXES} 
                index={1} 
                label='CHECKBOX_1' 
                selected={selectedCheckbox1} 
                onChangeState={() => setSelectedCheckBox1(!selectedCheckbox1)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.RADIO_BUTTONS} 
            index={1} 
            label='RADIOBUTTON_1' 
            selected={selectedRadioBtn === 1} 
            onChangeState={() => setSelectedRadioBtns(1)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.CHECKBOXES} 
            index={2} 
            label='CHECKBOX_2' 
            selected={selectedCheckbox2} 
            onChangeState={() => setSelectedCheckBox2(!selectedCheckbox2)} 
            />
            <SingleSelectorComponent 
            type={SelectorType.RADIO_BUTTONS} 
            index={1} 
            label='RADIOBUTTON_2' 
            selected={selectedRadioBtn === 2} 
            onChangeState={() => setSelectedRadioBtns(2)} 
            />
        </div>
    
    )
}

export default SelectorField