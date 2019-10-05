import React, { useState } from 'react';
import { Validator, ValidatorError } from '../validators/Validator';

import { View } from 'react-native';

import './InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  defaultText?: string;
  validator: Validator;
}

const defaultTextFieldProps: TextFieldProps = {
  label: 'Label',
  placeholder: 'gg',
  defaultText: 'ff',
  validator: new Validator([])
};

const CustomTextField: React.FC<TextFieldProps> = passedProps => {
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
    setErrors(props.validator.test(value));
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
          label={props.label}
          value={content}
          onChangeText={(text: string) => setContentAndErrors(text)}
        />

        <HelperText type="error" visible={errorMessages.length > 0}>
          {errorMessages}
        </HelperText>
      </View>
    </div>
  );
};

CustomTextField.defaultProps = defaultTextFieldProps;

const NumberField: React.FC = () => {
  return (
    <div className="input-container">
      <input className="input-field number" type="number" />
    </div>
  );
};

export { CustomTextField, NumberField };
