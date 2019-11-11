import {SearchOption, SearchOptionGroup} from "./inputs/FieldInterfaces";
import {FieldType} from "../../redux/types/InputField";
import {ValidatorError} from "./validators/Validator";

export enum FormType {
    POPUP = "popup",
    NORMAL = ""
}

export interface InputField {
    uuid: string;
    formUuid: string;
    controllerUrl: string | null;
    type: string;
    defaultValue: FieldType;
    isRequired: boolean;
    isVisible: boolean;
    label: string;
    name: string;
    placeholder: string | null;
    validators: string[];
    errors: ValidatorError[];
    optionsUrl?: string;
    options?: SearchOptionGroup[] | SearchOption[];
}

export interface FormProps {
    uuid: string;
    title: string;
    fields: InputField[];
    formType?: FormType;
    endpoint: string;
}