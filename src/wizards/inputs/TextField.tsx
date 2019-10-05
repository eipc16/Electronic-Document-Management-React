import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Validator } from '../validators/Validator';
import { createSelector } from 'reselect'
import { View } from 'react-native';

import uuid from 'uuid'

import './InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';

import rootReducer from '../../redux/reducers'

import {setFieldValue, setFieldValidationResults, registerInputField} from '../../redux/actions'
import { InputFieldState, InputFieldsState } from '../../redux/types';

export enum InputStyle {
  FLAT = "flat",
  OUTLINE = "outlined"
}

export enum InputType {
    NUMBER = "numeric",
    TEXT = "default",
    EMAIL = "email-address"
}

interface TextFieldProps {
  label: string;
  uuid: string;
  formUuid: string;
  validator: Validator | undefined;
  type: InputStyle;
  inputType: InputType;
  defaultText?: string;
}

export interface ExtendedTextFieldProps {
  label: string;
  uuid?: string;
  formUuid?: string;
  defaultText?: string;
  validator?: Validator;
  type?: InputStyle;
  inputType?: InputType;
}

const defaultFieldStyle = {
  "backgroundColor": "transparent",
  "border-size": "5px"
}

const getInputFieldByUuid = (fieldsState: InputFieldsState, uuid: string) => {
  return fieldsState.inputFields[uuid]
}

const getInputFieldByUuidSelector = createSelector(
                                              (state: InputFieldsState) => state, 
                                              (state: any, uuid: string) => uuid, 
                                              getInputFieldByUuid)

const TextField: React.FC<TextFieldProps> = props => {
  const dispatch = useDispatch()
  const [exists, setExists] = useState(false)
  
  if(!exists) {
    dispatch(registerInputField({
      uuid: props.uuid,
      formUuid: props.formUuid,
      name: props.label,
      value: props.defaultText ? props.defaultText : '',
      isValid: true,
      errors: []
    }))
    
    setExists(true)
  }

  const fieldState: InputFieldState = useSelector(
    (state: ReturnType<typeof rootReducer>) => getInputFieldByUuidSelector(state.fields, props.uuid))

  const {uuid, errors, isValid, name, value} = fieldState

  const setContentAndErrors = (value: string) => {
    dispatch(setFieldValue(uuid, value))
    
    if(props.validator) {
      const validatorList = props.validator.test(value)
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
      <View>
        <TextInput
          label={name}
          key={uuid}
          value={value.toString()}
          error={!isValid}
          mode={props.type}
          keyboardType={props.inputType}
          onChangeText={(text: string) => setContentAndErrors(text)}
          style={defaultFieldStyle}
        />

        <HelperText type="error" visible={!isValid}>
          {errorMessages}
        </HelperText>
      </View>
    </div>
  );
};

export const getInputFieldComponent = (props: ExtendedTextFieldProps) => {
  return (
    <TextField 
      validator={props.validator}
      label={props.label}
      uuid={props.uuid ? props.uuid : uuid.v4()}
      formUuid={props.formUuid ? props.formUuid : ''}
      type={props.type ? props.type : InputStyle.FLAT}
      inputType={props.inputType ? props.inputType : InputType.TEXT}
      defaultText={props.defaultText}
      />
  )
}