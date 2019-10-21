import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Validator } from '../validators/Validator';

import './InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';

import { useFieldStateByUUid, useRegisterField } from '../../utils/ReduxUtils'

import {setFieldValue, setFieldValidationResults} from '../../redux/actions'
import { InputFieldState } from '../../redux/types';
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

export enum InputStyle {
  FLAT = "flat",
  OUTLINE = "outlined"
}

export enum InputType {
    NUMBER = "numeric",
    TEXT = "default",
    EMAIL = "email-address",
    PASSWORD = "visible-password",
    // DATE = "date"
}

interface TextFieldProps {
  label: string;
  uuid: string;
  formUuid: string;
  name: string;
  validator: Validator | undefined;
  type: InputStyle;
  inputType: InputType;
  placeholder: string;
  defaultText?: string;
  required: boolean;
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
  placeholder?: string;
  required?: boolean;
}

const defaultFieldStyle = {
  "backgroundColor": "transparent",
  "border-size": "5px"
}

const TextField: React.FC<TextFieldProps> = props => {
  const dispatch = useDispatch()
  const [hideText, setHideText] = useState(true)

  useRegisterField({
      uuid: props.uuid,
      formUuid: props.formUuid,
      type: props.inputType.valueOf(),
      name: props.name,
      label: props.label,
      value: props.defaultText ? props.defaultText : '',
      isValid: true,
      errors: []
  })

  const fieldState: InputFieldState = useFieldStateByUUid(props.uuid)

  if(!fieldState) {
    return null
  }

  const {uuid, errors, isValid, label, value, name} = fieldState

  const setContentAndErrors = (value: string) => {
    dispatch(setFieldValue(uuid, value))
    
    if(props.validator) {
      const validatorList = props.validator.test(value)
      dispatch(setFieldValidationResults(uuid, validatorList))
    }
  };

  const secureText = () => {
    return props.inputType === InputType.PASSWORD && hideText
  }

  let errorMessages: JSX.Element[] = [];

  if (props.validator) {
    errorMessages = errors.map((error, index) => {
      return <div key={index}>- {error.message}</div>;
    });
  }

  return (
    <div className="input-container" key={name}>
      <div className="input-container-inner">
        <TextInput
          label={label + (props.required ? " *" : '')}
          key={uuid}
          value={(value != null) ? value.toString() : ''}
          error={!isValid}
          mode={props.type}
          keyboardType={props.inputType}
          onChangeText={(text: string) => setContentAndErrors(text)}
          style={defaultFieldStyle}
          secureTextEntry={secureText()}
        />
        { props.inputType === InputType.PASSWORD 
          ? (
              <label
                className="checkbox-label"
                htmlFor={`checkbox_${uuid}`}>
                  <input type="checkbox"
                    id={`checkbox_${uuid}`}
                    checked={hideText} 
                    onChange={() => setHideText(!hideText)} 
                    style={{'display': 'none'}}
                  />
                  <Icon className="password-checkbox" path={hideText ? mdiEyeOutline : mdiEyeOffOutline } size={1} />
              </label>
          ): null
        }
      </div>
      <HelperText type="error" visible={!isValid}>
        {errorMessages}
      </HelperText>
    </div>
  );
};

export const getInputFieldComponent = (props: ExtendedTextFieldProps) => {
  return (
    <TextField 
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
      />
  )
}