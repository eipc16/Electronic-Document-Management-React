import {Validator} from "../validators/Validator";
import {FieldType} from "../../../redux/types/InputField";

export enum InputStyle {
    FLAT = "flat",
    OUTLINE = "outlined"
}

export enum InputType {
    NUMBER = "numeric",
    TEXT = "default",
    EMAIL = "email-address",
    PASSWORD = "visible-password",
}

export enum SelectorType {
    RADIO_BUTTONS = "radio-buttons",
    CHECKBOXES = "checkboxes",
    SWITCH = "switch"
}

interface FieldProps {
    label: string;
    uuid: string;
    formUuid: string;
    name: string;
    required: boolean;
    onUpdate?: (data: FieldType) => void;
}

export interface SearchFieldProps extends FieldProps {
    type: string;
    defaultValue: SearchOption | null;
    optionsUrl?: string;
}

export interface DateTimeProps extends FieldProps {
    type: DateTimeType;
    defaultValue: string;
    validator?: Validator;
}

export interface SelectorFieldProps extends FieldProps {
    type: SelectorType;
    defaultValue: boolean | number | null;
}

export interface TextFieldProps extends FieldProps {
    type: InputStyle;
    inputType: InputType;
    validator: Validator | undefined;
    placeholder: string | null;
    defaultText?: string;
}

export interface ExtendedTextFieldProps {
    label: string;
    uuid: string;
    formUuid?: string;
    defaultText?: string;
    name: string;
    validator?: Validator;
    type?: InputStyle;
    inputType?: InputType;
    placeholder?: string | null;
    required?: boolean;
}

export enum DateTimeType {
    DATE = "date",
    TIME = "time",
    DATE_AND_TIME = "datetime-local"
}

export interface SelectorProps {
    label: string;
    uuid: string;
    name: string;
    formUuid?: string;
    type?: DateTimeType;
    defaultValue?: Date;
    validator?: Validator;
    required?: boolean;
}

export interface SearchOption {
    label: string;
    value: string;
}

export interface SearchOptionGroup {
    label: string;
    options: SearchOption[];
}