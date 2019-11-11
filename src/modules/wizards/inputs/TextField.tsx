import React, { useState } from 'react';
import {connect} from 'react-redux'

import './styles/InputFields.scss';
import { HelperText, TextInput } from 'react-native-paper';


import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import {InputType, TextFieldProps} from "./FieldInterfaces";
import {ReduxStore} from "../../../utils/ReduxUtils";
import {InputFieldState} from "../../../redux/types/InputField";
import {defaultFieldStyle} from "./styles/FieldUtils";
import {services} from "../../../context";

type ComponentProps = TextFieldProps & { fieldData?: InputFieldState };

const TextField: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [hideText, setHideText] = useState(true);

    if(!props.fieldData) {
        return null;
    }

    const { uuid, label, value, name, errors, isVisible, isRequired } = props.fieldData;
    const isValid = errors.length === 0;

    const setContentAndErrors = (value: string) => {
        services.wizardService.updateFieldValue(uuid, value);

        if(props.onUpdate) {
            props.onUpdate(value);
        }

        if(props.validator) {
          const validatorList = props.validator.test(value);
          // dispatch(setFieldValidationResults(uuid, validatorList))
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

    const className = `input-container input-field ${!isVisible ? 'hidden' : ''}`;

      return (
        <div className={className} key={name}>
          <div className="input-container-inner">
            <TextInput
              label={label + (isRequired ? " *" : '')}
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

const mapStateToProps = (store: ReduxStore, ownProps: TextFieldProps) => {
    return {
        fieldData: store.inputFields[ownProps.uuid],
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(TextField);