import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import TextField from '@material-ui/core/TextField';

import { registerInputField, setFieldValue, setFieldValidationResults } from '../../redux/actions'
import { InputFieldsState, InputFieldState } from '../../redux/types'

import rootReducer from '../../redux/reducers'
import { Validator } from '../validators/Validator'

import './InputFields.scss'
import { format } from 'date-fns';

export enum SelectorType {
    DATE = "date",
    TIME = "time",
    DATE_AND_TIME = "datetime-local"
}

interface FieldProps {
    label: string;
    uuid: string;
    formUuid: string;
    type: SelectorType;
    defaultValue: string;
    validator?: Validator;
    required: boolean;
}

export interface SelectorProps {
    label: string;
    uuid: string;
    formUuid?: string;
    type?: SelectorType;
    defaultValue?: Date;
    validator?: Validator;
    required?: boolean;
}

const getInputFieldByUuid = (fieldsState: InputFieldsState, uuid: string) => {
    return fieldsState.inputFields[uuid]
}

const getInputFieldByUuidSelector = createSelector(
    (state: InputFieldsState) => state, 
    (state: any, uuid: string) => uuid, 
    getInputFieldByUuid)

const DateTimeField: React.FC<FieldProps> = props => {
    const dispatch = useDispatch()
    const [exists, setExists] = useState(false)

    if(!exists) {
        const identifier = props.uuid
  
        dispatch(registerInputField({
          uuid: identifier,
          formUuid: props.formUuid,
          name: props.label,
          value: props.defaultValue ? props.defaultValue : '',
          isValid: true,
          errors: []
        }))
    
        setExists(true)
    }

    const fieldState: InputFieldState = useSelector(
        (state: ReturnType<typeof rootReducer>) => getInputFieldByUuidSelector(state.fields, props.uuid))
    
    const {uuid, errors, isValid, name, value} = fieldState

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
          return <div key={index}>- {error.message}</div>;
        });
      }

    return (
        <div className="input-container">
            <TextField
                id={uuid}
                label={name}
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
            formUuid={props.formUuid ? props.formUuid : ''}
            type={props.type ? props.type : SelectorType.DATE}
            defaultValue={props.defaultValue ? format(props.defaultValue, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
            validator={props.validator}
            required={props.required ? props.required : false}
        />
    )
  }