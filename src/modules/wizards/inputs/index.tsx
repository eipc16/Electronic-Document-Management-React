import {
    DateTimeType,
    ExtendedTextFieldProps,
    InputStyle,
    InputType, SearchFieldProps,
    SelectorFieldProps,
    SelectorProps
} from "./FieldInterfaces";
import {format} from "date-fns";
import React from "react";
import DateTimeField from "./DateTimeField";
import DropdownSearchField from './SearchField';
import SelectorField from "./SelectorField";
import TextField from "./TextField";
import {FieldType} from "../../../redux/types/InputField";

export const getDateTimeComponent = (props: SelectorProps, onUpdate?: (data: FieldType) => void) => {
    return (
        <DateTimeField
            key={props.uuid}
            label={props.label}
            uuid={props.uuid}
            name={props.name}
            formUuid={props.formUuid ? props.formUuid : ''}
            type={props.type ? props.type : DateTimeType.DATE}
            defaultValue={props.defaultValue ? format(new Date(props.defaultValue), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
            validator={props.validator}
            required={props.required ? props.required : false}
            onUpdate={onUpdate}
        />
    )
};

export const getSearchBoxComponent = (props: SearchFieldProps, onUpdate?: (data: FieldType) => void) => {
    return (
        <DropdownSearchField
            key={props.uuid}
            uuid={props.uuid}
            formUuid={props.formUuid}
            name={props.name}
            type={props.type}
            label={props.label}
            defaultValue={props.defaultValue}
            optionsUrl={props.optionsUrl}
            required={props.required}
            onUpdate={onUpdate}
        />
    )
};

export function getSelectorField(props: SelectorFieldProps, onUpdate?: (data: FieldType) => void) {
    return <SelectorField
        key={props.uuid}
        type={props.type}
        defaultValue={props.defaultValue}
        uuid={props.uuid}
        formUuid={props.formUuid}
        name={props.name}
        label={props.label}
        required={props.required}
        onUpdate={onUpdate}
    />
}

export const getInputFieldComponent = (props: ExtendedTextFieldProps, onUpdate?: (data: FieldType) => void) => {
    return (
        <TextField
            key={props.uuid}
            validator={props.validator}
            label={props.label}
            uuid={props.uuid}
            name={props.name}
            formUuid={props.formUuid ? props.formUuid : ''}
            type={props.type ? props.type : InputStyle.FLAT}
            inputType={props.inputType ? props.inputType : InputType.TEXT}
            defaultText={props.defaultText}
            required={props.required ? props.required : false}
            placeholder={props.placeholder ? props.placeholder : ''}
            onUpdate={onUpdate}
        />
    )
};