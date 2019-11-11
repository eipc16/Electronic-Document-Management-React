import React from 'react'
import {Switch} from "@material-ui/core";
import {connect} from "react-redux";

import {SelectorFieldProps, SelectorType} from "./FieldInterfaces";
import {ReduxStore} from "../../../utils/ReduxUtils";
import {InputFieldState} from "../../../redux/types/InputField";
import {services} from "../../../context";

type ComponentProps = SelectorFieldProps & { fieldData?: InputFieldState }

const SwitchComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    if(!props.fieldData) {
        return null;
    }

    const { uuid, label, value, isRequired, isVisible } = props.fieldData;
    const selected = value as boolean;

    const updateFieldState = (e: React.ChangeEvent, selected: boolean) => {
        if(props.onUpdate) {
            props.onUpdate(selected);
        }

        services.wizardService.updateFieldValue(uuid, selected);
    };

    const className = `input-container switch-selector ${!isVisible ? 'hidden' : ''}`;

    return (
        <div className={className}>
            <label htmlFor={`selector_${uuid}`}>{label + (isRequired ? " *" : '')}</label>
            <Switch name={`selector_${uuid}`} checked={selected} onChange={updateFieldState}/>
        </div>
    )
};

const RadioButtonGroup: React.FC<SelectorFieldProps> = (props: SelectorFieldProps) => {
    return <div />
};

const CheckBoxGroup: React.FC<SelectorFieldProps> = (props: SelectorFieldProps) => {
    return <div />
};

const SelectorField: React.FC<SelectorFieldProps> = (props: SelectorFieldProps) => {

    switch(props.type) {
        case SelectorType.SWITCH:
            return <SwitchComponent {...props} />;
        case SelectorType.CHECKBOXES:
            return <RadioButtonGroup {...props} />;
        case SelectorType.RADIO_BUTTONS:
            return <CheckBoxGroup {...props} />;
        default:
            return <div />;
    }
};

const mapStateToProps = (store: ReduxStore, ownProps: SelectorFieldProps) => {
    return {
        fieldData: store.inputFields[ownProps.uuid],
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(SelectorField);