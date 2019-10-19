import React from 'react';
import { SearchOption, SearchOptionGroup, SelectorType, InputType, getInputFieldComponent, getDateTimeComponent, getSearchBoxComponent } from './inputs';
import { Validator } from './validators/Validator';
import { noUpperCase, hasLengthGreaterThan10, dateIsAfterToday } from './validators/ValidatorRules';

import { Button } from 'react-native-paper';

import './Wizards.scss'
import { useDispatch } from 'react-redux';
import { setCurrentForm, sendForm } from '../redux/actions';
import { useRegisterCurrentForm } from '../utils/ReduxUtils';
import { FormState } from '../redux/types';

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
    placeholder: string;
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

function getValidatorFunctionFromString(validation: string) {
    switch(validation) {
        case 'noUpperCase':
            return noUpperCase
        case 'hasLengthGreaterThan10':
            return hasLengthGreaterThan10
        case 'dateIsAfterToday':
            return dateIsAfterToday
        default:
            return undefined
    }
}

function getValidator(validations: string[]) {
    const validator = new Validator([])

    validations.forEach(validation => {
        const validationFunction = getValidatorFunctionFromString(validation)

        if(validationFunction != undefined) {
            validator.addRule(validationFunction)
        }
    })

    return validator
}

function getTextInput(data: InputField) {
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

function getDateInput(data: InputField) {
    const IndexedSelectorType: { [idx: string]: SelectorType } = SelectorType;
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

function getSearchInput(data: InputField) {
    const searchBoxValue = data.defaultValue as SearchOption

    return getSearchBoxComponent({
        label: data.label,
        uuid: data.uuid,
        name: data.name,
        formUuid: data.formUuid,
        type: 'selector',
        defaultValue: searchBoxValue,
        validator: getValidator(data.validators),
        required: data.isRequired,
        options: data.options ? data.options : []
    })
}

function getCorrectInputComponent(data: InputField) {
    const type = data.type;
    let result = null

    if(type in SelectorType) {
        result = getDateInput(data)
    } else if(type in InputType) {
        result = getTextInput(data)
    } else if (type === 'selector') {
        result = getSearchInput(data)
    }

    return result
}

export const FormComponent: React.FC<FormProps> = form => {
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(sendForm())
    }

    const handleDecline = () => {

    }

    const inputList = form.fields.map(field => {
        return getCorrectInputComponent(field)
    })

    useRegisterCurrentForm(form)

    const formType = form.formType ? form.formType.valueOf() : FormType.NORMAL;
    
    return (
        <div className={`form-container ${formType}`}>
            <p className='form-title'>{form.title}</p>
            <form>
                {inputList}
            </form>
            <div className='form-btn-container'>
                <div className='btn cancel'>
                    <Button
                        mode="outlined"
                        color='red'
                        onPress={() => handleDecline()}>
                        {'CANCEL'}
                    </Button>
                </div>
                <div className='btn cancel'>
                <Button
                    mode="outlined" 
                    onPress={() => handleSubmit()}>
                    {'SUBMIT'}
                </Button>
                </div>
            </div>
        </div>
    )
}

export const getForm = (title: string, uuid: string, fields: InputField[], endpoint: string, formType?: FormType) => {
    return (
        <FormComponent 
            title={title}
            uuid={uuid}
            fields={fields}
            formType={FormType.POPUP}
            endpoint={endpoint}
      />
    )
}