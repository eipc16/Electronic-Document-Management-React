import {SearchOption, SearchOptionGroup} from "./inputs/SearchField";

export enum FormType {
    POPUP = "popup",
    NORMAL = ""
}

export interface InputField {
    uuid: string;
    formUuid: string;
    type: string;
    defaultValue: string | number | boolean | Date | File | SearchOption;
    isRequired: boolean;
    label: string;
    name: string;
    placeholder: string | null;
    validators: string[];
    options?: SearchOptionGroup[] | SearchOption[];
}

export interface FormProps {
    uuid: string;
    title: string;
    fields: InputField[];
    formType?: FormType;
    endpoint: string;
}