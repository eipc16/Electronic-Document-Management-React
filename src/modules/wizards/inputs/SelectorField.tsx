import React, { useState } from 'react'
import {FormControlLabel, Switch} from "@material-ui/core";
import {SelectorFieldProps, SelectorType} from "./FieldInterfaces";
import {useFieldStateByUUid, useRegisterField} from "../../../utils/ReduxUtils";
import {useDispatch} from "react-redux";
import {InputFieldState} from "../../../redux/types/InputField";
import {SearchOption} from "./SearchField";
import {setFieldValue} from "../../../redux/actions/InputField";

const SwitchComponent: React.FC<SelectorFieldProps> = (props: SelectorFieldProps) => {
    const dispatch = useDispatch();
    const { name, defaultValue, uuid, required, label, formUuid, type } = props;

    useRegisterField({
        uuid: uuid,
        formUuid: formUuid,
        name: name,
        type: type,
        label: label,
        value: defaultValue,
        isValid: true,
        errors: []
    });

    const updateFieldState = (e: React.ChangeEvent, selected: boolean) => {
        dispatch(setFieldValue(uuid, selected))
    };

    const fieldState: InputFieldState = useFieldStateByUUid(uuid);

    if(!fieldState) {
        return null
    }

    const { value } = fieldState;
    const selected = value as boolean;

    return (
        <div className='input-container switch-selector'>
            <label htmlFor={`selector_${uuid}`}>{label + (required ? " *" : '')}</label>
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

export function getSelectorField(props: SelectorFieldProps) {
    return <SelectorField
            type={props.type}
            defaultValue={props.defaultValue}
            uuid={props.uuid}
            formUuid={props.formUuid}
            name={props.name}
            label={props.label}
            required={props.required}
        />
}