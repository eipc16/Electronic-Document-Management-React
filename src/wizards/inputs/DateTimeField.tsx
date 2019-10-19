import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@material-ui/core/TextField';

import { setFieldValue, setFieldValidationResults } from '../../redux/actions'
import { InputFieldState } from '../../redux/types'

import { Validator } from '../validators/Validator'

import './InputFields.scss'
import { format } from 'date-fns';
import { useFieldStateByUUid, useRegisterField } from '../../utils/ReduxUtils';

export enum SelectorType {
    DATE = "date",
    TIME = "time",
    DATE_AND_TIME = "datetime-local"
}

interface FieldProps {
    label: string;
    uuid: string;
    formUuid: string;
    name: string;
    type: SelectorType;
    defaultValue: string;
    validator?: Validator;
    required: boolean;
}

export interface SelectorProps {
    label: string;
    uuid: string;
    name: string;
    formUuid?: string;
    type?: SelectorType;
    defaultValue?: Date;
    validator?: Validator;
    required?: boolean;
}

const DateTimeField: React.FC<FieldProps> = props => {
    const dispatch = useDispatch()

    useRegisterField({
        uuid: props.uuid,
        formUuid: props.formUuid,
        label: props.label,
        name: props.name,
        type: props.type.valueOf(),
        value: props.defaultValue ? props.defaultValue : '',
        isValid: true,
        errors: []
    })

    const fieldState: InputFieldState = useFieldStateByUUid(props.uuid)
    
    if(!fieldState) {
        return null
    }
    
    const {uuid, errors, isValid, label, value, name} = fieldState

    const setContentAndErrors = (value: string) => {

        const newDate = new Date(value);

        dispatch(setFieldValue(uuid, newDate))
        
        if(props.validator) {
          const validatorList = props.validator.test(newDate)
          dispatch(setFieldValidationResults(uuid, validatorList))
        }
    };
    
    let errorMessages: JSX.Element[] = [];
    
    if (props.validator) {
        errorMessages = errors.map((error, index) => {
          return <span key={index}>- {error.message}</span>;
        });
    }

    return (
        <div className="input-container" key={name}>
            <TextField
                id={uuid}
                label={label}
                className="date-picker"
                type="date"
                defaultValue={value}
                onChange={(newDate) => setContentAndErrors(newDate.target.value)}
                InputLabelProps={{
                    shrink: true,
                    required: props.required
                }}
                error={!isValid}
                helperText={errorMessages}
            />
        </div>
    )
}

export default DateTimeField

export const getDateTimeComponent = (props: SelectorProps) => {
    return (
        <DateTimeField
            label={props.label}
            uuid={props.uuid}
            name={props.name}
            formUuid={props.formUuid ? props.formUuid : ''}
            type={props.type ? props.type : SelectorType.DATE}
            defaultValue={props.defaultValue ? format(props.defaultValue, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
            validator={props.validator}
            required={props.required ? props.required : false}
        />
    )
  }