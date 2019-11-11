import {Validator} from "../validators/Validator";

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