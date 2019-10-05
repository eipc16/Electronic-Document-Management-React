import React, { useState } from 'react';
import { Validator, ValidatorError } from '../validators/Validator';

import { View } from 'react-native';

import './InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';

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
  placeholder?: string;
  defaultText?: string;
  validator?: Validator;
  type?: InputStyle;
  inputType?: InputType;
}

const defaultTextFieldProps: TextFieldProps = {
  label: 'Label',
  placeholder: '',
  defaultText: '',
  type: InputStyle.FLAT,
  inputType: InputType.EMAIL
};

const defaultFieldStyle = {
  "backgroundColor": "transparent",
  "border-size": "5px"
}

export const CustomTextField: React.FC<TextFieldProps> = passedProps => {
  const props: TextFieldProps = {
    ...defaultTextFieldProps,
    ...passedProps
  };

  const [content, setContent] = useState<string>(
    props.defaultText ? props.defaultText : ''
  );
  const [errors, setErrors] = useState<ValidatorError[]>([]);

  const setContentAndErrors = (value: string) => {
    setContent(value);

    if(props.validator) {
      setErrors(props.validator.test(value));
    }
  };

  let errorMessages: JSX.Element[] = [];

  if (props.validator) {
    errorMessages = errors.map((error, index) => {
      return <div key={index}>- {error.message}</div>;
    });
  }

  const hasErrors = errorMessages.length > 0

  return (
    <div className="input-container">
      <View>
        <TextInput
          label={props.label}
          value={content}
          error={hasErrors}
          mode={props.type}
          keyboardType={props.inputType}
          onChangeText={(text: string) => setContentAndErrors(text)}
          style={defaultFieldStyle}
        />

        <HelperText type="error" visible={hasErrors}>
          {errorMessages}
        </HelperText>
      </View>
    </div>
  );
};

CustomTextField.defaultProps = defaultTextFieldProps;