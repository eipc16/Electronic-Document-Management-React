import React from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';

import { InputFieldState } from '../../../redux/types/index'
import {ReduxStore} from "../../../utils/ReduxUtils";
import {DateTimeProps} from "./FieldInterfaces";

import './styles/InputFields.scss'
import {services} from "../../../context";

type ComponentProps = DateTimeProps & { fieldData?: InputFieldState }

const DateTimeField: React.FC<ComponentProps> = (props: ComponentProps) => {
    if(!props.fieldData) {
        return null;
    }

    const { uuid, label, value, errors, name, isRequired, isVisible } = props.fieldData;
    const isValid = errors.length === 0;

    const setContentAndErrors = (value: string) => {
        const newDate = new Date(value);
        services.wizardService.updateFieldValue(uuid, newDate);

        if(props.onUpdate) {
            props.onUpdate(value);
        }

        if(props.validator) {
          const validatorList = props.validator.test(newDate)
          // dispatch(setFieldValidationResults(uuid, validatorList))
        }
    };
    
    let errorMessages: JSX.Element[] = [];
    
    if (props.validator) {
        errorMessages = errors.map((error, index) => {
          return <span key={index}>- {error.message}</span>;
        });
    }

    const className = `input-container date-picker ${!isVisible ? 'hidden' : ''}`;

    return (
        <div className={className} key={name}>
            <TextField
                id={uuid}
                label={label}
                className="date-picker"
                type="date"
                defaultValue={value}
                onChange={(newDate) => setContentAndErrors(newDate.target.value)}
                InputLabelProps={{
                    shrink: true,
                    required: isRequired
                }}
                error={!isValid}
                helperText={errorMessages}
            />
        </div>
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: DateTimeProps) => {
    return {
        fieldData: store.inputFields[ownProps.uuid],
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(DateTimeField);