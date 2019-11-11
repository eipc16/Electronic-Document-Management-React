import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import './InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';


import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import {ExtendedTextFieldProps, InputStyle, InputType, TextFieldProps} from "./FieldInterfaces";
import {useFieldStateByUUid, useRegisterField} from "../../../utils/ReduxUtils";
import {InputFieldState} from "../../../redux/types/InputField";
import {setFieldValidationResults, setFieldValue} from "../../../redux/actions/InputField";

const defaultFieldStyle = {
  "backgroundColor": "transparent"
}

const TextField: React.FC<TextFieldProps> = props => {
  const dispatch = useDispatch()
  const [hideText, setHideText] = useState(true);

  useRegisterField({
      uuid: props.uuid,
      formUuid: props.formUuid,
      type: props.inputType.valueOf(),
      name: props.name,
      label: props.label,
      value: props.defaultText ? props.defaultText : '',
      isValid: true,
      errors: []
  });

  const fieldState: InputFieldState = useFieldStateByUUid(props.uuid);

  if(!fieldState) {
    return null
  }

  const {uuid, errors, isValid, label, value, name} = fieldState;

  const setContentAndErrors = (value: string) => {
    dispatch(setFieldValue(uuid, value));
    
    if(props.validator) {
      const validatorList = props.validator.test(value);
      dispatch(setFieldValidationResults(uuid, validatorList))
    }
  };

  const secureText = () => {
    return props.inputType === InputType.PASSWORD && hideText
  };

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
          keyboardType={props.inputType === InputType.PASSWORD ? 'default' : props.inputType}
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
      key={props.uuid}
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