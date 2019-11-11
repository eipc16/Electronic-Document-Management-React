import {dateIsAfterToday, hasLengthGreaterThan10, noUpperCase} from "./validators/ValidatorRules";
import {Validator} from "./validators/Validator";
import {InputField} from "./WizardInterfaces";
import {getSearchBoxComponent, SearchOption} from "./inputs/SearchField";
import {getInputFieldComponent} from "./inputs/TextField";
import {getDateTimeComponent, DateTimeType} from "./inputs/DateTimeField";
import {InputType, SelectorType} from "./inputs/FieldInterfaces";
import {getSelectorField} from "./inputs/SelectorField";

export function getValidatorFunctionFromString(validation: string) {
    switch(validation) {
        case 'noUpperCase':
            return noUpperCase
        case 'hasLengthGreaterThan10':
            return hasLengthGreaterThan10;
        case 'dateIsAfterToday':
            return dateIsAfterToday;
        default:
            return undefined
    }
}

export function getValidator(validations: string[]) {
    const validator = new Validator([])

    validations.forEach(validation => {
        const validationFunction = getValidatorFunctionFromString(validation)

        if(validationFunction != undefined) {
            validator.addRule(validationFunction)
        }
    })

    return validator
}

export function getTextInput(data: InputField) {
    const IndexedInputType: { [idx: string]: InputType } = InputType

    return getInputFieldComponent({
        label: data.label,
        uuid: data.uuid,
        formUuid: data.formUuid,
        defaultText: data.defaultValue.toString(),
        name: data.name,
        validator: getValidator(data.validators),
        inputType: IndexedInputType[data.type],
        placeholder: data.placeholder,
        required: data.isRequired,
    })
}

export function getDateInput(data: InputField) {
    const IndexedSelectorType: { [idx: string]: DateTimeType } = DateTimeType;
    const defaultDate = data.defaultValue as Date

    return getDateTimeComponent({
        label: data.label,
        uuid: data.uuid,
        name: data.name,
        formUuid: data.formUuid,
        type: IndexedSelectorType[data.type],
        defaultValue: defaultDate,
        validator: getValidator(data.validators),
        required: data.isRequired,
    })
}

export function getSearchInput(data: InputField) {
    const searchBoxValue = data.defaultValue as SearchOption;

    let options = data.options;
    if(data.options instanceof String) {
        options = [];
    } else {
        options = data.options ? data.options : [];
    }

    return getSearchBoxComponent({
        label: data.label,
        uuid: data.uuid,
        name: data.name,
        formUuid: data.formUuid,
        type: 'selector',
        defaultValue: searchBoxValue,
        validator: getValidator(data.validators),
        required: data.isRequired,
        options: options
    })
}

export function getSelectorInput(data: InputField) {
    let defaultValue = false;

    if(data.defaultValue instanceof Boolean) {
        defaultValue = data.defaultValue as boolean;
    }

    const type = Object.values(SelectorType)
        .filter(selectorType => selectorType.valueOf() === data.type)[0];


    return getSelectorField({
        label: data.label,
        defaultValue: defaultValue,
        uuid: data.uuid,
        formUuid: data.formUuid,
        type: type,
        name: data.name,
        required: data.isRequired
    })
}

function isADateTime(type: string) {
    return Object.keys(DateTimeType).includes(type) || Object.values(DateTimeType).map((val: DateTimeType) => val.toString()).includes(type);
}

function isAnInputType(type: string) {
    return Object.keys(InputType).includes(type)  || Object.values(InputType).map((val: InputType) => val.toString()).includes(type);
}

function isASelectorType(type: string) {
    return Object.keys(SelectorType).includes(type)  || Object.values(SelectorType).map((val: SelectorType) => val.toString()).includes(type) ;
}

function isASearchBox(type: string) {
    return type === 'searchbox';
}

export function getCorrectInputComponent(data: InputField) {
    const type = data.type;
    let result = null;

    if(isADateTime(type)) {
        result = getDateInput(data)
    } else if(isAnInputType(type)) {
        result = getTextInput(data)
    } else if(isASelectorType(type)) {
        result = getSelectorInput(data)
    } else if (isASearchBox(type)) {
        result = getSearchInput(data)
    }
    return result
}